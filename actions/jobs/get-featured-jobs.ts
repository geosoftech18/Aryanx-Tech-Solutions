"use server";

import prismadb from "@/lib/prismaDB";
import { Job } from "@prisma/client";

/**
 * Fetches all featured jobs with their company details
 * @returns Array of featured jobs with company information
 */
export async function getFeaturedJobs(): Promise<(Job & { company: { name: string; logo?: string | null } })[]> {
  try {
    const featuredJobs = await prismadb.job.findMany({
      where: {
        isFeatured: true
      },
      include: {
        company: {
          select: {
            name: true,
            logo: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return featuredJobs;
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    throw new Error("Failed to fetch featured jobs");
  }
} 