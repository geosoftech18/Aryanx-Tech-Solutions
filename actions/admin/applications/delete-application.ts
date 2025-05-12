"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prismadb from "@/lib/prismaDB"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth"

/**
 * Delete an application by admin.
 * Only accessible by ADMIN role.
 */
export async function deleteApplication(applicationId: string): Promise<void> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  await prismadb.application.delete({
    where: { id: applicationId },
  })
} 