"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { Application, Role } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

export interface UpdateApplicationInput {
  applicationId: string
  candidateId: string
  jobId: string
  coverLetter: string
}

export interface UpdateApplicationResponse {
  success: boolean
  application?: Application
  error?: string
}

/**
 * Update an application as admin.
 * Only accessible by ADMIN role.
 */
export async function updateApplicationAdmin(
  input: UpdateApplicationInput
): Promise<UpdateApplicationResponse> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) {
    return { success: false, error: "Unauthorized" }
  }
  try {
    const { applicationId, candidateId, jobId, coverLetter } = input
    const application = await prismadb.application.update({
      where: { id: applicationId },
      data: {
        candidateId,
        jobId,
        coverLetter,
      },
    })
    return { success: true, application }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" }
  }
} 