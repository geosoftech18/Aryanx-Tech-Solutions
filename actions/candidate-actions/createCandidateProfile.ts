"use server";

import prismaDB from "@/lib/prismaDB";
import { revalidatePath } from "next/cache";
import { CandidateType, Gender, LGBTQ, PwdCategory } from "@prisma/client";
import { CandidateFormValues } from "@/components/candidate/formschema";

export async function createCandidateProfile(
  userId: string,
  values: CandidateFormValues,
  resumeUrl?: string
): Promise<{
  success: boolean;
  message: string;
  candidate?: any;
}> {
  try {
    if (!userId) {
      return { success: false, message: "User ID is required" };
    }

    // Validate required special fields
    if (!values.gender) {
      return { success: false, message: "Gender is required" };
    }

    const existingCandidate = await prismaDB.candidate.findUnique({
      where: { userId },
    });

    if (existingCandidate) {
      return {
        success: false,
        message: "Candidate profile already exists. Please update instead.",
      };
    }

    // Helper function to safely parse experience
    const parseExperience = (expString: string | number): number => {
      if (typeof expString === "number") return expString;
      const matches = expString.toString().match(/\d+/);
      return matches ? parseInt(matches[0], 10) : 0;
    };

    const candidateData = {
      userId,
      contact: values.contact,
      YOE: parseExperience(values.YOE),
      skills: values.skills,
      Bio: values.Bio,
      DOB: values.DOB,
      resume: resumeUrl || null, // Use provided resume URL or null
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
          company: cert.company,
          issueDate: cert.issueDate,
          expirationDate: cert.expirationDate || null,
        })) || [],
      },
      WorkExperience: {
        create: values.WorkExperience?.map((exp: any) => ({
          name: exp.companyName,
          companyName: exp.companyName,
          position: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate || null,
          currentlyWorking: exp.currentlyWorking || false,
          jobDescription: exp.jobDescription || "",
        })) || [],
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

    const candidate = await prismaDB.candidate.create({
      data: candidateData as any,
      include: {
        education: true,
        certifications: true,
        WorkExperience: true,
        Address: true,
      },
    });

    // Update user name fields
    await prismaDB.user.update({
      where: { id: userId },
      data: {
        firstname: values.firstname,
        middlename: values.middlename || null,
        lastname: values.lastname,
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
    
    return {
      success: false,
      message: "An error occurred while creating candidate profile",
    };
  }
}