"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Application, Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export interface CreateApplicationInput {
  candidateId: string;
  jobId: string;
  coverLetter: string;
}

export interface CreateApplicationResponse {
  success: boolean;
  application?: Application;
  error?: string;
}

/**
 * Create an application as admin.
 * Only accessible by ADMIN role.
 */
export async function createApplicationAdmin(
  input: CreateApplicationInput
): Promise<CreateApplicationResponse> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) {
    return { success: false, error: "Unauthorized" };
  }
  try {
    const { candidateId, jobId, coverLetter } = input;
    const candidate = await prismadb.candidate.findUnique({ where: { id: candidateId } });
    if (!candidate) return { success: false, error: "Candidate not found" };
    const job = await prismadb.job.findUnique({ where: { id: jobId } });
    if (!job) return { success: false, error: "Job not found" };
    const application = await prismadb.application.create({
      data: {
        candidateId,
        jobId,
        userId: candidate.userId,
        coverLetter,
      },
    });
    return { success: true, application };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
} 