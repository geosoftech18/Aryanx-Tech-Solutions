"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { Role } from "@prisma/client"

/**
 * Delete a user by admin.
 * Only accessible by ADMIN role.
 */
export async function deleteUser(userId: string): Promise<void> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  await prismadb.user.delete({
    where: { id: userId },
  })
} 