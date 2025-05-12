"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { Company, Role, Job } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

export type CompanyWithJobs = Company & { jobs: Job[] }

/**
 * Get a single company by id for admin panel.
 * Only accessible by ADMIN role.
 */
export async function getCompanyDetails(companyId: string): Promise<CompanyWithJobs | null> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const company = await prismadb.company.findUnique({
    where: { id: companyId },
    include: { jobs: true },
  })
  return company
} 