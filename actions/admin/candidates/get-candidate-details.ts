"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Role, Candidate, User, Education, Certification, WorkExperience, Address, Application } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export interface CandidateDetails extends Candidate {
  user: User;
  education: Education[];
  certifications: Certification[];
  WorkExperience: WorkExperience[];
  Address: Address | null;
  applications: Application[];
}

/**
 * Get all details for a single candidate by ID (admin only).
 */
export async function getCandidateDetails(candidateId: string): Promise<CandidateDetails | null> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");

  const candidate = await prismadb.candidate.findUnique({
    where: { id: candidateId },
    include: {
      user: true,
      education: true,
      certifications: true,
      WorkExperience: true,
      Address: true,
      applications: true,
    },
  });
  return candidate;
} 