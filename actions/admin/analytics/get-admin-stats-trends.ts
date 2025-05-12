"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prismadb from "@/lib/prismaDB"
import { Role, ApplicationStatus } from "@prisma/client"
import { getServerSession } from "next-auth"

export interface AdminStatsTrends {
  newUsers: number
  newJobs: number
  newApplications: number
  conversionRate: number
  previousUsers: number
  previousJobs: number
  previousApplications: number
  previousConversionRate: number
  percentChangeUsers: number
  percentChangeJobs: number
  percentChangeApplications: number
  percentChangeConversion: number
}

/**
 * Get admin dashboard stats and trends for analytics cards.
 * Only accessible by ADMIN role.
 */
export async function getAdminStatsTrends(): Promise<AdminStatsTrends> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  // Get date ranges for this month and last month
  const now = new Date()
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)

  // This month
  const [newUsers, newJobs, newApplications, newHires] = await Promise.all([
    prismadb.user.count({ where: { createdAt: { gte: startOfThisMonth } } }),
    prismadb.job.count({ where: { createdAt: { gte: startOfThisMonth } } }),
    prismadb.application.count({ where: { createdAt: { gte: startOfThisMonth } } }),
    prismadb.application.count({ where: { createdAt: { gte: startOfThisMonth }, status: ApplicationStatus.ACCEPTED } }),
  ])
  // Last month
  const [previousUsers, previousJobs, previousApplications, previousHires] = await Promise.all([
    prismadb.user.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } } }),
    prismadb.job.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } } }),
    prismadb.application.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } } }),
    prismadb.application.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth }, status: ApplicationStatus.ACCEPTED } }),
  ])

  // Conversion rate = hires / applications
  const conversionRate = newApplications > 0 ? (newHires / newApplications) * 100 : 0
  const previousConversionRate = previousApplications > 0 ? (previousHires / previousApplications) * 100 : 0

  // Percent change helpers
  function percentChange(current: number, prev: number): number {
    if (prev === 0) return current === 0 ? 0 : 100
    return ((current - prev) / prev) * 100
  }

  return {
    newUsers,
    newJobs,
    newApplications,
    conversionRate: Number(conversionRate.toFixed(1)),
    previousUsers,
    previousJobs,
    previousApplications,
    previousConversionRate: Number(previousConversionRate.toFixed(1)),
    percentChangeUsers: Number(percentChange(newUsers, previousUsers).toFixed(1)),
    percentChangeJobs: Number(percentChange(newJobs, previousJobs).toFixed(1)),
    percentChangeApplications: Number(percentChange(newApplications, previousApplications).toFixed(1)),
    percentChangeConversion: Number(percentChange(conversionRate, previousConversionRate).toFixed(1)),
  }
} 