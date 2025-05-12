"use server";

import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/prismaDB";
import { Prisma, Role } from "@prisma/client";

export async function createJobAdmin(data: Prisma.JobCreateInput) {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session || session.user.role !== Role.ADMIN)
      throw new Error("Unauthorized");

    const job = await prisma.job.create({
      data: {
        ...data,
      },
    });

    return { success: true, job };
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false, error: "Failed to create job" };
  }
}
