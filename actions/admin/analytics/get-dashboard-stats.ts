"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prismadb from "@/lib/prismaDB"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth"

export interface DashboardStats {
  jobs: number
  applications: number
  users: number
  companies: number
}

/**
 * Get dashboard stats for admin (total jobs, applications, users, companies).
 * Only accessible by ADMIN role.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const [jobs, applications, users, companies] = await Promise.all([
    prismadb.job.count(),
    prismadb.application.count(),
    prismadb.user.count(),
    prismadb.company.count(),
  ])

  return { jobs, applications, users, companies }
} 