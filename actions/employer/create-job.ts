"use server";

import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/prismaDB";
import { EmploymentType, WorkMode, JobCategory, Prisma } from "@prisma/client";

export async function createJob(data: Prisma.JobCreateInput) {
  console.log(data, "data");
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Get company ID from user
    const company = await prisma.company.findUnique({
      where: { userId: session.user.id },
    });

    if (!company) {
      throw new Error("Company not found");
    }

    const job = await prisma.job.create({
      data: {
        ...data
      },
    });

    return { success: true, job };
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false, error: "Failed to create job" };
  }
}

export async function updateJob(jobId: string, data: Prisma.JobUpdateInput) {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Verify job belongs to user's company
    const company = await prisma.company.findUnique({
      where: { userId: session.user.id },
      include: { jobs: { where: { id: jobId } } },
    });

    if (!company || company.jobs.length === 0) {
      throw new Error("Job not found or unauthorized");
    }

    const job = await prisma.job.update({
      where: { id: jobId },
      data,
    });

    return { success: true, job };
  } catch (error) {
    console.error("Error updating job:", error);
    return { success: false, error: "Failed to update job" };
  }
}

export async function deleteJob(jobId: string) {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Verify job belongs to user's company
    const company = await prisma.company.findUnique({
      where: { userId: session.user.id },
      include: { jobs: { where: { id: jobId } } },
    });

    if (!company || company.jobs.length === 0) {
      throw new Error("Job not found or unauthorized");
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting job:", error);
    return { success: false, error: "Failed to delete job" };
  }
}

export async function toggleJobStatus(jobId: string, isActive: boolean) {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Verify job belongs to user's company
    const company = await prisma.company.findUnique({
      where: { userId: session.user.id },
      include: { jobs: { where: { id: jobId } } },
    });

    if (!company || company.jobs.length === 0) {
      throw new Error("Job not found or unauthorized");
    }

    const job = await prisma.job.update({
      where: { id: jobId },
      data: { isActive } as Prisma.JobUpdateInput,
    });

    return { success: true, job };
  } catch (error) {
    console.error("Error toggling job status:", error);
    return { success: false, error: "Failed to toggle job status" };
  }
} 