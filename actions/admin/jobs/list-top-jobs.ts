"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prismadb from "@/lib/prismaDB"
import { Application, Job, Role, Company } from "@prisma/client"
import { getServerSession } from "next-auth"

/**
 * Fetch the top N jobs by number of applications for the admin dashboard.
 * Only accessible by ADMIN role.
 */
export async function listTopJobs(limit: number = 4): Promise<(Job & { applications: Application[] } & { company: Company })[]> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const jobs = await prismadb.job.findMany({
    orderBy: [{ applications: { _count: "desc" } }],
    take: limit,
    include: {
      company: true,
      applications: true,
    },
  })

  return jobs;
}
