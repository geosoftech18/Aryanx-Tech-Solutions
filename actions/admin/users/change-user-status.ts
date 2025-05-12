"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { User, Role, UserStatus } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * Change user status (activate/deactivate) by admin.
 * Only accessible by ADMIN role.
 */
export async function changeUserStatus(userId: string, status: UserStatus): Promise<User> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const user = await prismadb.user.update({
    where: { id: userId },
    data: { status },
  })
  return user
} 