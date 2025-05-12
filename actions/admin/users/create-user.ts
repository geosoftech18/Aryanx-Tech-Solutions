"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import {  Prisma, Role, User, UserStatus } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import bcrypt from "bcryptjs"


/**
 * Create a new user by admin.
 * Only accessible by ADMIN role.
 */
export async function createUserAdmin(data: Prisma.UserCreateInput): Promise<User | null> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  // Hash password before saving
  console.log(data)
  const hashedPassword = await bcrypt.hash(data.password, 12)

  const user = await prismadb.user.create({
    data: {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      status: data.status,
    },
  })
  return user
} 