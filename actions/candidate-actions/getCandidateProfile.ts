"use server";

import { formSchema } from "@/components/candidate/formschema";
import prismadb from "@/lib/prismaDB";
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
        user: true,
      },
    });

    if (!candidate) return null;

    // Ensure all dates are properly handled
    const defaultDate = new Date();

    return {
      contact: candidate.contact ?? "",
      houseNo: candidate.Address?.houseNo ?? 0,
      locality: candidate.Address?.locality ?? "",
      pincode: candidate.Address?.pincode ?? 0,
      country: candidate.Address?.country ?? "",
      state: candidate.Address?.state ?? "",
      city: candidate.Address?.city ?? "",
      DOB: candidate.DOB ?? defaultDate,
      YOE: candidate.YOE ?? 0,
      skills: candidate.skills ?? [],
      Bio: candidate.Bio ?? "",
      firstname: candidate.user.firstname ?? "",
      middlename: candidate.user.middlename ?? "",
      lastname: candidate.user.lastname ?? "",
      gender: candidate.gender,
      candidateType: candidate.candidateType,
      pwdCategory: candidate.pwdCategory,
      LGBTQ: candidate.LGBTQ,
      employmentBreak: candidate.employmentBreak,
      education: candidate.education.map((edu) => ({
        degree: edu.degree,
        specialisation: edu.specialisation,
        institution: edu.institution,
        passout_year: edu.passout_year ?? defaultDate,
        CGPA: Number(edu.CGPA) || 0,
      })),
      certifications: candidate.certifications.map((cert) => ({
        name: cert.name,
        company: cert.company,
        issueDate: cert.issueDate ?? defaultDate,
        expirationDate: cert.expirationDate ?? defaultDate,
      })),
      WorkExperience: candidate.WorkExperience.map((exp) => ({
        name: exp.companyName,
        position: exp.position,
        startDate: exp.startDate ?? defaultDate,
        endDate: exp.endDate ?? defaultDate,
        currentlyWorking: exp.currentlyWorking ?? false,
        jobDescription: exp.jobDescription ?? "",
        companyName: exp.companyName,
      })),
      acknowledgement: false,
      resume: undefined,
    };
  } catch (error) {
    console.error("Error fetching candidate data:", error);
    return null;
  }
}