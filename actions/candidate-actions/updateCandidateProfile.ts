"use server";

import prismaDB from "@/lib/prismaDB";
import { revalidatePath } from "next/cache";
import { Candidate, CandidateType, Gender, LGBTQ, PwdCategory } from "@prisma/client";
import { CandidateFormValues } from "@/components/candidate/formschema";

export async function updateCandidateProfile(
  userId: string,
  values: CandidateFormValues,
  resumeUrl?: string
): Promise<{
  success: boolean;
  message: string;
  candidate?: Candidate;
}> {
  try {
    if (!userId) {
      return { success: false, message: "User ID is required" };
    }

    // Validate required special fields
    if (!values.gender) {
      return { success: false, message: "Gender is required" };
    }

    // Get existing candidate profile
    const existingCandidate = await prismaDB.candidate.findUnique({
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

    // Helper function to safely parse experience
    const parseExperience = (expString: string | number): number => {
      if (typeof expString === "number") return expString;
      const matches = expString.toString().match(/\d+/);
      return matches ? parseInt(matches[0], 10) : 0;
    };

    // Delete existing related records
    await prismaDB.$transaction([
      prismaDB.education.deleteMany({ where: { candidateId: existingCandidate.id } }),
      prismaDB.certification.deleteMany({ where: { candidateId: existingCandidate.id } }),
      prismaDB.workExperience.deleteMany({ where: { candidateId: existingCandidate.id } }),
      prismaDB.address.deleteMany({ where: { candidateId: existingCandidate.id } }),
    ]);

    // Update candidate profile
    const updatedCandidate = await prismaDB.candidate.update({
      where: { userId },
      data: {
        contact: values.contact,
        YOE: parseExperience(values.YOE),
        skills: values.skills,
        Bio: values.Bio,
        DOB: values.DOB,
        resume: resumeUrl || existingCandidate.resume, // Use new resume URL if provided, otherwise keep existing
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
      await prismaDB.address.update({
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
      await prismaDB.address.create({
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
    await prismaDB.user.update({
      where: { id: userId },
      data: {
        firstname: values.firstname,
        middlename: values.middlename || null,
        lastname: values.lastname,
      },
    });

    revalidatePath("/candidate/profile");
    revalidatePath("/dashboard");
    revalidatePath("/candidate");

    return {
      success: true,
      message: "Candidate profile updated successfully",
      candidate: updatedCandidate,
    };
  } catch (error) {
    console.error("Error updating candidate profile:", error);
    
    return {
      success: false,
      message: "An error occurred while updating candidate profile",
    };
  }
} 