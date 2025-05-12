"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prismadb from "@/lib/prismaDB"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth"

export interface AnalyticsData {
  jobs: number
  applications: number
  users: number
  companies: number
  // Add more analytics fields as needed
}

/**
 * Get analytics data for admin dashboard (counts, trends, etc.).
 * Only accessible by ADMIN role.
 */
export async function getAnalyticsData(startDate?: Date, endDate?: Date): Promise<AnalyticsData> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  // Only apply date filter to models that support createdAt
  const jobWhere = startDate && endDate ? { createdAt: { gte: startDate, lte: endDate } } : undefined
  const applicationWhere = startDate && endDate ? { createdAt: { gte: startDate, lte: endDate } } : undefined
  const companyWhere = startDate && endDate ? { createdAt: { gte: startDate, lte: endDate } } : undefined
  const userWhere = undefined // Not filtering users by date for now

  const [jobs, applications, users, companies] = await Promise.all([
    prismadb.job.count({ where: jobWhere }),
    prismadb.application.count({ where: applicationWhere }),
    prismadb.user.count({ where: userWhere }),
    prismadb.company.count({ where: companyWhere }),
  ])

  return { jobs, applications, users, companies }
} 