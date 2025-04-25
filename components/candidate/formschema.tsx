import { CandidateType, Gender, LGBTQ, PwdCategory } from "@prisma/client";
import { z } from "zod";

export const formSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  housenumber: z.string(),
  locality: z.string(),
  pincode: z.string(),
  country: z.string().min(1, "Country is required"),
  currentState: z.string().min(1, "Current state is required"),
  currentCity: z.string().min(1, "Current city is required"),
  dob: z.string().min(1, "Date of birth is required"),
  experience: z.string(),
  skills: z.string(),

  bio: z.string().min(20, "Bio must be at least 20 characters"),
  jobTitle: z.string().min(2, "Job title is required"),
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        specialization: z.string().min(1, "Specialization is required"),
        institution: z.string().min(1, "Institution is required"),
        yearOfCompletion: z.string().min(1, "Year of completion is required"),
        grade: z.string().min(1, "CGPA/Percentage is required"),
      })
    )
    .min(1, "At least one education record is required"),
  certifications:
    z.array(
      z.object({
        name: z.string().min(1, "Certification name is required"),
        issuingCompany: z.string().min(1, "Issuing company is required"),
        issueDate: z.string().min(1, "Issue date is required"),
        expiryDate: z.string().optional(),
      })
    ) || [], // Ensure it's always an array
  workExperience:
    z.array(
      z.object({
        companyName: z.string().min(1, "Company name is required"),
        position: z.string().min(1, "Position is required"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().optional(),
        currentlyWorking: z.boolean(),
        description: z.string().optional(),
      })
    ) || [], // Ensure it's always an array
  acknowledgement: z.boolean().refine((value) => value === true, {
    message: "You must acknowledge the terms and conditions",
  }),
  resume: z
    .any() // Change from z.instanceof(File) to z.any()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .refine(
      (file) =>
        !file ||
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      {
        message: "Only PDF, DOC, and DOCX files are allowed",
      }
    ),
    candidateType: z.nativeEnum(CandidateType).optional(),
    gender: z.nativeEnum(Gender),
    pwdCategory: z.nativeEnum(PwdCategory).optional(),
    LGBTQ:z.nativeEnum(LGBTQ).optional(),
    employmentBreak: z.string().optional(),
});