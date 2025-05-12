"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { listUsersFiltersSchema, ListUsersFilters } from "../utils/parse-filters"
import { User, Role, UserStatus } from "@prisma/client"
import type { Prisma } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * List users with filters, sorting, and pagination for admin panel.
 * Only accessible by ADMIN role.
 */
export async function listUsers(filters: ListUsersFilters): Promise<{ users: User[]; total: number }> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const parsed = listUsersFiltersSchema.parse(filters)
  const { page, pageSize, search, role, status, sortBy, sortOrder } = parsed

  // Build Prisma query
  const where: any = {}
  if (search) {
    where.OR = [
      { firstname: { contains: search, mode: "insensitive" } },
      { lastname: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ]
  }
  if (role) where.role = role as Role
  if (status) {
    // Map status to emailVerified or other fields as needed
    if (status === UserStatus.ACTIVE) where.status = UserStatus.ACTIVE
    if (status === UserStatus.PENDING) where.status = UserStatus.PENDING
    if (status === UserStatus.INACTIVE) where.status = UserStatus.INACTIVE
    // Add more status logic if needed
  }

  // Type assertion is safe here because Prisma will validate at runtime
  const orderBy = (sortBy ? { [sortBy]: sortOrder || "asc" } : { createdAt: "desc" }) as Prisma.UserOrderByWithRelationInput

  const [users, total] = await Promise.all([
    prismadb.user.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prismadb.user.count({ where }),
  ])

  return { users: users, total }
} 