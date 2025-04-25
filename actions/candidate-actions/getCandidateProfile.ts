"use server";

import { formSchema } from "@/components/candidate/formschema";
import prismadb from "@/lib/prismaDB";
import { Candidate } from "@prisma/client";
import { z } from "zod";

export async function getCandidateProfileData(
  userId: string
): Promise<z.infer<typeof formSchema> | null> {
  try {
    const candidate = await prismadb.candidate.findUnique({
      where: { userId },
      include: {
        education: true,
        certifications: true,
        WorkExperience: true,
        Address: true,
      },
    });

    if (!candidate) return null;

    return {
      phone: candidate.contact ?? "",
      housenumber: candidate.Address?.houseNo.toString() ?? "",
      locality: candidate.Address?.locality ?? "",
      pincode: candidate.Address?.pincode.toString() ?? "",
      country: candidate.Address?.country ?? "",
      currentState: candidate.Address?.state ?? "",
      currentCity: candidate.Address?.city ?? "",
      dob: candidate.DOB?.toISOString().split("T")[0] ?? "",
      experience: candidate.YOE?.toString() ?? "",
      skills: candidate.skills?.join(", ") ?? "",
      bio: candidate.Bio ?? "",
      jobTitle:  "", 
      gender: candidate.gender ?? undefined,
      candidateType: candidate.candidateType ?? undefined,
      pwdCategory: candidate.pwdCategory ?? undefined,
      LGBTQ: candidate.LGBTQ ?? undefined,
      employmentBreak: candidate.employmentBreak ?? undefined,
      education: candidate.education.map((edu) => ({
        degree: edu.degree ?? "",
        specialization: edu.specialisation ?? "",
        institution: edu.institution ?? "",
        yearOfCompletion: edu.passout_year?.toString() ?? "",
        grade: edu.CGPA?.toString() ?? "",
      })),
      certifications: candidate.certifications.map((cert) => ({
        name: cert.name ?? "",
        issuingCompany: cert.company ?? "",
        issueDate: cert.issueDate?.toISOString().split("T")[0] ?? "",
        expiryDate: cert.expirationDate?.toISOString().split("T")[0] ?? undefined,
      })),
      workExperience: candidate.WorkExperience.map((exp) => ({
        companyName: exp.name ?? "",
        position: exp.position ?? "",
        startDate: exp.startDate?.toISOString().split("T")[0] ?? "",
        endDate: exp.endDate?.toISOString().split("T")[0] ?? undefined,
        currentlyWorking: exp.currentlyWorking ?? false,
        description: exp.jobDescription ?? undefined,
      })),
      acknowledgement: false,
      resume: undefined,
    };
  } catch (error) {
    console.error("Error fetching candidate data:", error);
    return null;
  }
}