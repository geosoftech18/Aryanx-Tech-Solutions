"use server";

import { deleteFile, storeFile } from "@/lib/filestorage";
import prismadb from "@/lib/prismaDB";
import { revalidatePath } from "next/cache";
import { CandidateType, Gender, LGBTQ, PwdCategory } from "@prisma/client";
import { CandidateFormValues } from "@/components/candidate/formschema";

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
    const values: CandidateFormValues = JSON.parse(formData.get("values") as string);

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
      contact: values.contact,
      YOE: typeof values.YOE === "number" ? values.YOE : parseExperience(values.YOE),
      skills: values.skills,
      Bio: values.Bio,
      DOB: values.DOB,
      resume: resumePath,
      gender: values.gender as Gender,
      candidateType: values.candidateType as CandidateType || null,
      pwdCategory: values.pwdCategory as PwdCategory || null,
      LGBTQ: values.LGBTQ as LGBTQ || null,
      employmentBreak: values.employmentBreak || null,
      education: {
        create: values.education.map((edu: any) => ({
          degree: edu.degree,
          specialisation: edu.specialisation,
          institution: edu.institution,
          passout_year: edu.passout_year,
          CGPA: edu.CGPA,
        })),
      },
      certifications: {
        create: values.certifications?.map((cert: any) => ({
          name: cert.name,
          company: cert.issuingCompany,
          issueDate: new Date(cert.issueDate),
          expirationDate: cert.expiryDate ? new Date(cert.expiryDate) : null,
        })),
      },
      WorkExperience: {
        create: values.WorkExperience?.map((exp: any) => ({
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
          houseNo: values.houseNo,
          locality: values.locality,
          pincode: values.pincode,
          city: values.city,
          state: values.state,
          country: values.country,
        },
      },
    };

    const candidate = await prismadb.candidate.create({
      data: candidateData as any,
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