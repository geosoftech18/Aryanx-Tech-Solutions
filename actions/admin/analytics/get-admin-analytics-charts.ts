"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prismadb from "@/lib/prismaDB"
import { Role, ApplicationStatus } from "@prisma/client"
import { getServerSession } from "next-auth"

export interface JobsPerMonth {
  name: string // Month short name, e.g. 'Jan'
  total: number
}
export interface ApplicationsPerMonth {
  name: string // Month short name, e.g. 'Jan'
  applications: number
  hires: number
}

export interface AdminAnalyticsCharts {
  jobsPerMonth: JobsPerMonth[]
  applicationsPerMonth: ApplicationsPerMonth[]
}

/**
 * Get analytics chart data for admin dashboard (jobs per month, applications vs hires per month).
 * Only accessible by ADMIN role.
 */
export async function getAdminAnalyticsCharts(): Promise<AdminAnalyticsCharts> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const now = new Date()
  const months: { name: string; start: Date; end: Date }[] = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const start = new Date(d.getFullYear(), d.getMonth(), 1)
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)
    months.push({
      name: start.toLocaleString("default", { month: "short" }),
      start,
      end,
    })
  }

  // For each month, count jobs, applications, and hires
  const jobsPerMonth: JobsPerMonth[] = []
  const applicationsPerMonth: ApplicationsPerMonth[] = []
  for (const m of months) {
    const [jobs, applications, hires] = await Promise.all([
      prismadb.job.count({ where: { createdAt: { gte: m.start, lte: m.end } } }),
      prismadb.application.count({ where: { createdAt: { gte: m.start, lte: m.end } } }),
      prismadb.application.count({ where: { createdAt: { gte: m.start, lte: m.end }, status: ApplicationStatus.ACCEPTED } }),
    ])
    jobsPerMonth.push({ name: m.name, total: jobs })
    applicationsPerMonth.push({ name: m.name, applications, hires })
  }

  return { jobsPerMonth, applicationsPerMonth }
} 