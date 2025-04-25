"use server";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/prismaDB";
import { Job, JobType, JobCategory, Role } from "@prisma/client";
import { getServerSession } from "next-auth";

interface GetJobsByCompanyResponse {
  success: boolean;
  data?: (Job & {
    applications: { id: string }[];
  })[];
  error?: string;
}

export async function getJobsByCompany(): Promise<GetJobsByCompanyResponse> {
  try {
    // Get the current session
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized: Please log in",
      };
    }

    // Get the user with their company relation
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        company: true,
      },
    });

    // Verify if user exists and is an employer
    if (!user || user.role !== Role.EMPLOYER) {
      return {
        success: false,
        error: "Unauthorized: Only employers can access this resource",
      };
    }

    // Verify if user has a company
    if (!user.company) {
      return {
        success: false,
        error: "No company found for this employer",
      };
    }

    // Fetch jobs for the company
    const jobs = await prisma.job.findMany({
      where: {
        companyId: user.company.id,
      },
      include: {
        applications: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    console.error("Error fetching jobs by company:", error);
    return {
      success: false,
      error: "Failed to fetch jobs",
    };
  }
} 