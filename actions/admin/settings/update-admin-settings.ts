"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { User, Prisma, Role } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * Update admin user settings/profile.
 * Only accessible by ADMIN role.
 */
export async function updateAdminSettings(data: Prisma.UserUpdateInput): Promise<User> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const user = await prismadb.user.update({
    where: { id: session.user.id },
    data,
  })
  return user
} 