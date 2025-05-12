"use server";

import prismadb from "@/lib/prismaDB";
import { Job, Company, CandidateType } from "@prisma/client";

/**
 * Get recommended jobs for a candidate based on their candidateType.
 * @param userId - The user ID of the candidate
 * @returns Array of jobs (with company) where jobFor matches candidateType
 */
export async function getRecommendedJobsForCandidate(userId: string): Promise<(Job & { company: Company })[]> {
  try {
    // Fetch the candidate to get their candidateType
    const candidate = await prismadb.candidate.findUnique({
      where: { userId },
      select: { candidateType: true },
    });
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    // Fetch jobs where jobFor matches candidateType
    const jobs = await prismadb.job.findMany({
      where: { jobFor: candidate.candidateType, isActive: true },
      include: { company: true },
    });
    return jobs;
  } catch (error) {
    console.error("Error fetching recommended jobs:", error);
    throw new Error("Failed to fetch recommended jobs");
  }
} 