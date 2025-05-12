"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { listApplicationsFiltersSchema, ListApplicationsFilters } from "../utils/parse-filters"
import { Application, Prisma, ApplicationStatus, Role, Candidate, Job, Company, User } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * List applications with filters, sorting, and pagination for admin panel.
 * Only accessible by ADMIN role.
 */
export async function listApplications(filters: ListApplicationsFilters): Promise<{ applications: (Application & { candidate: Candidate & { user: User } | null; job: Job & { company: Company } | null })[] }> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const parsed = listApplicationsFiltersSchema.parse(filters)
  const { page, pageSize, search, status, sortBy, sortOrder } = parsed

  const where: Prisma.ApplicationWhereInput = {}
  if (search) {
    // Search by candidate name, job title, or company name (case-insensitive)
    where.OR = [
      { Candidate: { user: { firstname: { contains: search, mode: "insensitive" } } } },
      { Candidate: { user: { lastname: { contains: search, mode: "insensitive" } } } },
      { job: { title: { contains: search, mode: "insensitive" } } },
      { job: { company: { name: { contains: search, mode: "insensitive" } } } },
    ];
  }
  if (status) where.status = status as ApplicationStatus

  const orderBy = (sortBy ? { [sortBy]: sortOrder || "asc" } : { createdAt: "desc" }) as Prisma.ApplicationOrderByWithRelationInput

  const applications = await prismadb.application.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
        Candidate: {
          include: {
            user: true,
          },
        },
        job: {
          include: {
            company: true,
          },
        },
      },
  })

  // Map the response to match expected type with lowercase 'candidate'
  
  const mappedApplications = applications.map(app => ({
    ...app,
    candidate: app.Candidate,
    job: app.job
  }))

  // console.log(mappedApplications[0].candidate?.user)
  return { applications: mappedApplications }
}