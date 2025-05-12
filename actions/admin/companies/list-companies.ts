"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { listCompaniesFiltersSchema, ListCompaniesFilters } from "../utils/parse-filters"
import { Role, Industry, Sector, Company, Job } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * List companies for admin panel with filters (id and name only).
 * Only accessible by ADMIN role.
 * @param filters - Filtering, sorting, and pagination options
 * @returns Array of companies with id and name
 */

export type CompanyWithJobs = Company & { jobs: Job[] }

export async function listCompanies(filters: Partial<ListCompaniesFilters> = {}): Promise<{ companies: CompanyWithJobs[] }> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  // Parse and apply filters
  const parsed = listCompaniesFiltersSchema.parse({ ...filters })
  const { search, industry, sector } = parsed

  const where: any = {}
  if (search) {
    where.name = { contains: search, mode: "insensitive" }
  }
  if (industry) where.industry = industry as Industry
  if (sector) where.sector = sector as Sector

  // Only select id and name for combobox
  const companies = await prismadb.company.findMany({
    where,
    orderBy: { name: "asc" },
    include: {
      jobs: true,
    },
  })
  return {  companies }
} 