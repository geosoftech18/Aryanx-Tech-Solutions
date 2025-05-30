"use server"
import prisma from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { Prisma, Role } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

function omitSystemFields<T extends Record<string, unknown>>(data: T): Partial<T> {
  const { id, createdAt, updatedAt, ...rest } = data as Record<string, unknown>
  return rest as Partial<T>
}

// Create a new Why Choose Us card and link to AboutUs
export async function createWhyChooseUsCard(data: Omit<Prisma.AboutUsWhyChooseUsCardCreateInput, "aboutUs">) {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")
  const aboutUs = await prisma.aboutUs.findFirst()
  if (!aboutUs) throw new Error("AboutUs not found")
  return await prisma.aboutUsWhyChooseUsCard.create({
    data: { ...data, aboutUsId: aboutUs.id },
  })
}

// Update an existing Why Choose Us card by id
export async function updateWhyChooseUsCard(id: string, data: Partial<Omit<Prisma.AboutUsWhyChooseUsCardUpdateInput, "aboutUs">>) {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")
  return await prisma.aboutUsWhyChooseUsCard.update({
    where: { id },
    data: omitSystemFields(data),
  })
}

// Delete a Why Choose Us card by id
export async function deleteWhyChooseUsCard(id: string) {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")
  await prisma.aboutUsWhyChooseUsCard.delete({ where: { id } })
  return { success: true }
} 