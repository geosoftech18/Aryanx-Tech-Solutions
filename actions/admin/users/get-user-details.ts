"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { User, Role } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * Get a single user by id for admin panel.
 * Only accessible by ADMIN role.
 */
export async function getUserDetails(userId: string): Promise<User | null> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const user = await prismadb.user.findUnique({
    where: { id: userId },
  })
  return user
} 