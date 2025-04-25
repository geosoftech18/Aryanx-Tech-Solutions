"use server";

import { deleteFile, storeFile } from "@/lib/filestorage";
import prismadb from "@/lib/prismaDB";
import { revalidatePath } from "next/cache";
import { CandidateType, Gender, LGBTQ, PwdCategory } from "@prisma/client";

export async function createCandidateProfile(
  userId: string,
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
  candidate?: any;
}> {
  let resumePath = "";

  try {
    if (!userId) {
      return { success: false, message: "User ID is required" };
    }

    const resumeFile = formData.get("resume") as File;
    const values = JSON.parse(formData.get("values") as string);

    // Validate required special fields
    if (!values.gender) {
      return { success: false, message: "Gender is required" };
    }

    const existingCandidate = await prismadb.candidate.findUnique({
      where: { userId },
    });

    if (existingCandidate) {
      return {
        success: false,
        message: "Candidate profile already exists. Please update instead.",
      };
    }

    if (resumeFile) {
      try {
        const { filePath } = await storeFile(resumeFile, userId, "resume");
        resumePath = filePath;
      } catch (error) {
        console.error("Failed to store resume:", error);
        return {
          success: false,
          message: "Failed to upload resume. Please try again.",
        };
      }
    } else {
      return { success: false, message: "Resume is required" };
    }

    // Helper function to safely parse experience
    const parseExperience = (expString: string) => {
      const matches = expString.match(/\d+/);
      return matches ? parseInt(matches[0], 10) : 0;
    };

    const candidateData = {
      userId,
      contact: values.phone,
      YOE: parseExperience(values.experience),
      skills: values.skills.split(",").map((skill: string) => skill.trim()),
      Bio: values.bio,
      DOB: new Date(values.dob),
      resume: resumePath,
      gender: values.gender as Gender,
      candidateType: values.candidateType as CandidateType || null,
      pwdCategory: values.pwdCategory as PwdCategory || null,
      LGBTQ: values.LGBTQ as LGBTQ || null,
      employmentBreak: values.employmentBreak || null,
      education: {
        create: values.education.map((edu: any) => ({
          degree: edu.degree,
          specialisation: edu.specialization,
          institution: edu.institution,
          passout_year: edu.yearOfCompletion,
          CGPA: parseFloat(edu.grade) || 0,
        })),
      },
      certifications: {
        create: values.certifications.map((cert: any) => ({
          name: cert.name,
          company: cert.issuingCompany,
          issueDate: new Date(cert.issueDate),
          expirationDate: cert.expiryDate ? new Date(cert.expiryDate) : null,
        })),
      },
      WorkExperience: {
        create: values.workExperience.map((exp: any) => ({
          name: exp.companyName,
          position: exp.position,
          startDate: new Date(exp.startDate),
          endDate: exp.endDate ? new Date(exp.endDate) : null,
          currentlyWorking: exp.currentlyWorking,
          jobDescription: exp.description || "",
        })),
      },
      Address: {
        create: {
          houseNo: parseInt(values.housenumber) || 0,
          locality: values.locality,
          pincode: parseInt(values.pincode),
          city: values.currentCity,
          state: values.currentState,
          country: values.country,
        },
      },
    };

    const candidate = await prismadb.candidate.create({
      data: candidateData,
      include: {
        education: true,
        certifications: true,
        WorkExperience: true,
        Address: true,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Candidate profile created successfully",
      candidate,
    };
  } catch (error) {
    console.error("Error creating candidate profile:", error);
    
    if (resumePath) {
      try {
        await deleteFile(resumePath);
      } catch (cleanupError) {
        console.error("Error cleaning up resume file:", cleanupError);
      }
    }
    
    return {
      success: false,
      message: "An error occurred while creating candidate profile",
    };
  }
}