"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prismadb from "@/lib/prismaDB"
import { Role, ApplicationStatus } from "@prisma/client"
import { getServerSession } from "next-auth"

export interface TopJob {
  id: string
  title: string
  company: string
  location: string
  applications: number
  conversionRate: string // e.g. '22%'
}
export interface TopCompany {
  id: string
  name: string
  industry: string
  jobs: number
  applications: number
  hireRate: string // e.g. '24%'
  logo: string | null
}

export interface AdminTopPerformers {
  topJobs: TopJob[]
  topCompanies: TopCompany[]
}

/**
 * Get top jobs and companies for admin analytics page.
 * Only accessible by ADMIN role.
 */
export async function getAdminTopPerformers(): Promise<AdminTopPerformers> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  // Top jobs by applications (limit 5)
  const jobs = await prismadb.job.findMany({
    orderBy: { applications: { _count: "desc" } },
    include: { company: true, applications: true },
    take: 10, // get more to filter for conversion
  })
  // Compute conversion rate for each job
  const topJobs: TopJob[] = jobs
    .map((job) => {
      const applications = job.applications.length
      const hires = job.applications.filter((a) => a.status === ApplicationStatus.ACCEPTED).length
      const conversionRate = applications > 0 ? `${Math.round((hires / applications) * 100)}%` : "0%"
      return {
        id: job.id,
        title: job.title,
        company: job.company.name,
        location: job.location,
        applications,
        conversionRate,
      }
    })
    .sort((a, b) => b.applications - a.applications)
    .slice(0, 5)

  // Top companies by applications (limit 5)
  const companies = await prismadb.company.findMany({
    include: { jobs: { include: { applications: true } } },
    take: 10, // get more to filter for hire rate
  })
  const topCompanies: TopCompany[] = companies
    .map((company) => {
      const jobs = company.jobs.length
      const applications = company.jobs.reduce((acc, job) => acc + job.applications.length, 0)
      const hires = company.jobs.reduce(
        (acc, job) => acc + job.applications.filter((a) => a.status === ApplicationStatus.ACCEPTED).length,
        0
      )
      const hireRate = applications > 0 ? `${Math.round((hires / applications) * 100)}%` : "0%"
      return {
        id: company.id,
        name: company.name,
        industry: company.industry,
        jobs,
        applications,
        hireRate,
        logo: company.logo || null,
      }
    })
    .sort((a, b) => b.applications - a.applications)
    .slice(0, 5)

  return { topJobs, topCompanies }
} 