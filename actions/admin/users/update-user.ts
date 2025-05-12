"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { User, Prisma, Role } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * Update a user by admin.
 * Only accessible by ADMIN role.
 */
export async function updateUser(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const user = await prismadb.user.update({
    where: { id: userId },
    data,
  })
  return user
} 