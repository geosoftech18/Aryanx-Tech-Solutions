"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { listJobsFiltersSchema, ListJobsFilters } from "../utils/parse-filters"
import { Job, Prisma, EmploymentType,WorkMode, Role, Application, Company } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * List jobs with filters, sorting, and pagination for admin panel.
 * Only accessible by ADMIN role.
 */
export async function listJobs(filters: ListJobsFilters): Promise<(Job & { applications: Application[] } & { company: Company })[]> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const parsed = listJobsFiltersSchema.parse(filters)
  const { page, pageSize, search, status, type, companyId, sortBy, sortOrder } = parsed

  const where: Prisma.JobWhereInput = {}
  if (search) {
    where.title = { contains: search, mode: "insensitive" }
  }
  if (status) {
    // Map status to isActive, etc. if needed
    if (status === "active") where.isActive = true
    if (status === "inactive") where.isActive = false // adjust as per your schema
    // Add more status logic if needed
  }
  if (type) where.type = type as EmploymentType
  if (companyId) where.companyId = companyId

  let orderBy: Prisma.JobOrderByWithRelationInput;
  if (sortBy === "applications") {
    orderBy = { applications: { _count: sortOrder || "asc" } };
  } else {
    orderBy = sortBy ? { [sortBy]: sortOrder || "asc" } : { createdAt: "desc" };
  }

  const jobs = await 
    prismadb.job.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        applications: true,
        company: true,
      },
    })

  return jobs
} 