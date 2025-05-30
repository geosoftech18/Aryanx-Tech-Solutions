"use server"
import prisma from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { Prisma, Role } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

// Utility to omit system fields from update data
function omitSystemFields<T extends Record<string, unknown>>(data: T): Partial<T> {
  const { id, createdAt, updatedAt, ...rest } = data as Record<string, unknown>
  return rest as Partial<T>
}

// Create a new tab and link to AboutUs
export async function createTab(data: Omit<Prisma.AboutUsTabCreateInput, "aboutUs">) {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")
  const aboutUs = await prisma.aboutUs.findFirst()
  if (!aboutUs) throw new Error("AboutUs not found")
  return await prisma.aboutUsTab.create({
    data: { ...data, aboutUsId: aboutUs.id },
  })
}

// Update an existing tab by id
export async function updateTab(id: string, data: Partial<Omit<Prisma.AboutUsTabUpdateInput, "aboutUs">>) {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")
  return await prisma.aboutUsTab.update({
    where: { id },
    data: omitSystemFields(data),
  })
}

// Delete a tab by id
export async function deleteTab(id: string) {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")
  await prisma.aboutUsTab.delete({ where: { id } })
  return { success: true }
} 