import { Address, Candidate, CandidateType, Certification, Education, Gender, LGBTQ, PwdCategory, User, WorkExperience } from "@prisma/client";
import { z } from "zod";

type WorkExperienceType = Omit<WorkExperience, "candidateId" | "id">;
type EducationType = Omit<Education, "candidateId" | "id">;
type CertificationType = Omit<Certification, "candidateId" | "id">;
type AddressType = Omit<Address, "candidateId" | "id">;
type UserType = Omit<User, "id" | "createdAt" | "updatedAt" | "emailVerified" | "verifyToken" | "verifyExpires" | "candidate" | "company" | "middlename">;

export interface CandidateFormInterface extends Omit<Candidate, "id" | "userId" | "user" | "createdAt" | "updatedAt">, AddressType , UserType {
  education: EducationType[];
  certifications?: CertificationType[];
  WorkExperience?: WorkExperienceType[];
  acknowledgement: boolean;
  middlename?: string | null;
}

export type CandidateFormValues = Pick<CandidateFormInterface, 
  | "contact" 
  | "houseNo" 
  | "locality" 
  | "pincode" 
  | "country" 
  | "state" 
  | "city" 
  | "DOB" 
  | "YOE" 
  | "skills" 
  | "Bio" 
  | "firstname" 
  | "lastname" 
  | "middlename"
  | "education" 
  | "certifications" 
  | "WorkExperience" 
  | "candidateType" 
  | "gender" 
  | "pwdCategory" 
  | "LGBTQ" 
  | "employmentBreak"
> & {
  resume?: File;
};

export const formSchema = z.object({
  contact: z.string().min(10, "Phone number must be at least 10 characters"),
  houseNo: z.number(),
  locality: z.string(),
  pincode: z.number(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  DOB: z.date(),
  YOE: z.number(),
  skills: z.array(z.string()),
  Bio: z.string().min(20, "Bio must be at least 20 characters"),
  firstname: z.string().min(2, "Name is required"),
  middlename: z.string().optional(),
  lastname: z.string().min(2, "Name is required"),
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        specialisation: z.string().min(1, "Specialisation is required"),
        institution: z.string().min(1, "Institution is required"),
        passout_year: z.date(),
        CGPA: z.number(),
      })
    )
    .min(1, "At least one education record is required"),
  certifications: z
    .array(
      z.object({
        name: z.string().min(1, "Certification name is required"),
        company: z.string().min(1, "Company is required"),
        issueDate: z.date(),
        expirationDate: z.date(),
      })
    )
    .optional(),
  WorkExperience: z
    .array(
      z.object({
        name: z.string().min(1, "Company name is required"),
        position: z.string().min(1, "Position is required"),
        startDate: z.date(),
        endDate: z.date(),
        currentlyWorking: z.boolean(),
        jobDescription: z.string(),
        companyName: z.string().min(1, "Company name is required"),
      })
    )
    .optional(),
  resume: z
    .any()
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
    )
    .optional(),
  candidateType: z.nativeEnum(CandidateType),
  gender: z.nativeEnum(Gender),
  pwdCategory: z.nativeEnum(PwdCategory).nullable(),
  LGBTQ: z.nativeEnum(LGBTQ).nullable(),
  employmentBreak: z.string().nullable(),
  acknowledgement: z.boolean(),
}) satisfies z.ZodType<CandidateFormValues>;