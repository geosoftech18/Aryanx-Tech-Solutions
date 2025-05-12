"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { Role, User } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * Get admin user settings/profile.
 * Only accessible by ADMIN role.
 */
export async function getAdminSettings(): Promise<User | null> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const user = await prismadb.user.findUnique({
    where: { id: session.user.id },
  })
  return user
} 