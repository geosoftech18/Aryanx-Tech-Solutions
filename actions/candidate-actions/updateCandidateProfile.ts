"use server";

import { deleteFile, storeFile } from "@/lib/filestorage";
import prismadb from "@/lib/prismaDB";
import { revalidatePath } from "next/cache";
import { Candidate, CandidateType, Gender, LGBTQ, PwdCategory } from "@prisma/client";
import { CandidateFormValues } from "@/components/candidate/formschema";

export async function updateCandidateProfile(
  userId: string,
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
  candidate?: Candidate;
}> {
  let newResumePath = "";
  let oldResumePath = "";

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

    // Get existing candidate profile
    const existingCandidate = await prismadb.candidate.findUnique({
      where: { userId },
      include: {
        education: true,
        certifications: true,
        WorkExperience: true,
        Address: true,
      },
    });

    if (!existingCandidate) {
      return {
        success: false,
        message: "Candidate profile not found.",
      };
    }

    // Handle resume update if new file is provided
    if (resumeFile && resumeFile.size > 0) {
      try {
        const { filePath } = await storeFile(resumeFile, userId, "resume");
        newResumePath = filePath;
        oldResumePath = existingCandidate.resume || "";
      } catch (error) {
        console.error("Failed to store new resume:", error);
        return {
          success: false,
          message: "Failed to upload new resume. Please try again.",
        };
      }
    }

    // Helper function to safely parse experience
    const parseExperience = (expString: string) => {
      const matches = expString.match(/\d+/);
      return matches ? parseInt(matches[0], 10) : 0;
    };

    // Delete existing related records
    await prismadb.$transaction([
      prismadb.education.deleteMany({ where: { candidateId: existingCandidate.id } }),
      prismadb.certification.deleteMany({ where: { candidateId: existingCandidate.id } }),
      prismadb.workExperience.deleteMany({ where: { candidateId: existingCandidate.id } }),
      prismadb.address.deleteMany({ where: { candidateId: existingCandidate.id } }),
    ]);

    // Update candidate profile
    const updatedCandidate = await prismadb.candidate.update({
      where: { userId },
      data: {
        contact: values.contact,
        YOE: values.YOE,
        skills: values.skills,
        Bio: values.Bio,
        DOB: values.DOB,
        resume: newResumePath || existingCandidate.resume,
        gender: values.gender as Gender,
        candidateType: values.candidateType as CandidateType || null,
        pwdCategory: values.pwdCategory as PwdCategory || null,
        LGBTQ: values.LGBTQ as LGBTQ || null,
        employmentBreak: values.employmentBreak || null,
        education: {
          create: values.education.map((edu) => ({
            degree: edu.degree,
            specialisation: edu.specialisation,
            institution: edu.institution,
            passout_year: edu.passout_year,
            CGPA: edu.CGPA,
          })),
        },
        certifications: {
          create: (values.certifications || []).map((cert) => ({
            name: cert.name,
            company: cert.company,
            issueDate: cert.issueDate,
            expirationDate: cert.expirationDate || null,
          })),
        },
        WorkExperience: {
          create: (values.WorkExperience || []).map((exp) => ({
            name: exp.companyName,
            companyName: exp.companyName,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate || null,
            currentlyWorking: exp.currentlyWorking || false,
            jobDescription: exp.jobDescription || "",
          })),
        },
      },
      include: {
        education: true,
        certifications: true,
        WorkExperience: true,
        Address: true,
      },
    });

    // Update address separately
    if (existingCandidate.Address) {
      await prismadb.address.update({
        where: { id: existingCandidate.Address.id },
        data: {
          houseNo: values.houseNo,
          locality: values.locality,
          pincode: values.pincode,
          city: values.city,
          state: values.state,
          country: values.country,
        },
      });
    } else {
      await prismadb.address.create({
        data: {
          houseNo: values.houseNo,
          locality: values.locality,
          pincode: values.pincode,
          city: values.city,
          state: values.state,
          country: values.country,
          candidateId: updatedCandidate.id,
        },
      });
    }

    // Update user name fields
    await prismadb.user.update({
      where: { id: userId },
      data: {
        firstname: values.firstname,
        middlename: values.middlename || null,
        lastname: values.lastname,
      },
    });

    // Delete old resume file if new one was uploaded
    if (oldResumePath && newResumePath) {
      try {
        await deleteFile(oldResumePath);
      } catch (error) {
        console.error("Error deleting old resume:", error);
        // Don't return error as the update was successful
      }
    }

    revalidatePath("/CANDIDATE/profile");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Candidate profile updated successfully",
      candidate: updatedCandidate,
    };
  } catch (error) {
    console.error("Error updating candidate profile:", error);
    
    // Clean up new resume file if it was uploaded but update failed
    if (newResumePath) {
      try {
        await deleteFile(newResumePath);
      } catch (cleanupError) {
        console.error("Error cleaning up new resume file:", cleanupError);
      }
    }
    
    return {
      success: false,
      message: "An error occurred while updating candidate profile",
    };
  }
} 