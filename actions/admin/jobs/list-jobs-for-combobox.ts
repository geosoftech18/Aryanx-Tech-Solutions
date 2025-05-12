"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

/**
 * List all jobs for admin combobox selection.
 * Only accessible by ADMIN role.
 */
export async function listJobsForCombobox(): Promise<{ label: string; value: string }[]> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");

  const jobs = await prismadb.job.findMany({
    include: {
      company: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return jobs.map((j) => ({
    label: `${j.title} (${j.company.name})`,
    value: j.id,
  }));
} 