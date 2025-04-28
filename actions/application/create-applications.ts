"use server";

import prismadb from "@/lib/prismaDB";
import { ApplicationStatus } from "@prisma/client";

interface CreateApplicationsParams {
  companyId: string;
  candidateId: string;
  jobIds: string[];
}

export async function createApplicationsForCompanyJobs({
  companyId,
  candidateId,
  jobIds,
}: CreateApplicationsParams) {
  try {
    // First, verify that both the company and candidate exist
    const company = await prismadb.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error("Company not found");
    }

    const candidate = await prismadb.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new Error("Candidate not found");
    }

    // Get the specified jobs
    const jobs = await prismadb.job.findMany({
      where: {
        id: {
          in: jobIds,
        },
        companyId: companyId,
      },
    });

    if (jobs.length === 0) {
      throw new Error("No valid jobs found");
    }

    // Create applications for each job
    const applications = await Promise.all(
      jobs.map((job) =>
        prismadb.application.create({
          data: {
            status: ApplicationStatus.PENDING,
            jobId: job.id,
            candidateId: candidateId,
            userId: candidate.userId,
          },
        })
      )
    );

    return {
      success: true,
      message: `Created ${applications.length} applications successfully`,
      applications,
    };
  } catch (error) {
    console.error("Error creating applications:", error);
    throw new Error("Failed to create applications");
  }
} 