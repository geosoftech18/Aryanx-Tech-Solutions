"use server";

import prisma from "@/lib/prismaDB";
import { Job } from "@prisma/client";

/**
 * Fetches similar jobs based on job category
 * @param jobId - The ID of the current job
 * @param category - The job category to match
 * @param limit - Maximum number of similar jobs to return
 * @returns Array of similar jobs with company information
 */
export async function getSimilarJobs(
  jobId: string,
  category: string,
  limit: number = 3
): Promise<(Job & { company: { name: string; logo: string | null } })[]> {
  try {
    const similarJobs = await prisma.job.findMany({
      where: {
        id: { not: jobId },
        category: category as any, // Type assertion since Prisma enums are strings
      },
      take: limit,
      include: {
        company: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return similarJobs;
  } catch (error) {
    console.error("Error fetching similar jobs:", error);
    throw new Error("Failed to fetch similar jobs");
  }
} 