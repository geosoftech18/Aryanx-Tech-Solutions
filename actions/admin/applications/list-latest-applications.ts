"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prismadb from "@/lib/prismaDB"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth"

export interface LatestApplication {
  id: string
  name: string
  position: string
  company: string
  date: string
  status: string
  avatar: string
}

/**
 * Fetch the latest N applications for the admin dashboard.
 * Only accessible by ADMIN role.
 */
export async function listLatestApplications(limit: number = 4): Promise<LatestApplication[]> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const applications = await prismadb.application.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      Candidate: {
        include: {
          user: true,
        },
      },
      job: {
        select: { title: true, company: { select: { name: true } } },
      },
    },
  })

  return applications.map((a) => ({
    id: a.id,
    name: a.Candidate?.user ? `${a.Candidate.user.firstname} ${a.Candidate.user.lastname}` : "Unknown",
    position: a.job?.title || "Unknown",
    company: a.job?.company?.name || "Unknown",
    date: a.createdAt.toLocaleString(),
    status: a.status,
    avatar: "", // Add avatar if available in user or candidate
  }))
}
