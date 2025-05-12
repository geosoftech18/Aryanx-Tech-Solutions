"use server";

import prisma from "@/lib/prismaDB";
import { Job } from "@prisma/client";

/**
 * Fetches job details by ID
 * @param jobId - The ID of the job to fetch
 * @returns The job details with company information
 */
export async function getJobDetails(jobId: string): Promise<Job & { company: { id: string; name: string; description: string; logo: string | null; website: string | null; employees: string | null; industry: string; sector: string ; user: {id:string} } } | null> {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            description: true,
            logo: true,
            website: true,
            employees: true,
            industry: true,
            sector: true,
            user:{
              select:{
                id:true 
              }
            }
          },
        
        }
        ,
      },
    });

    if (!job) {
      return null;
    }

    return job;
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw new Error("Failed to fetch job details");
  }
} 