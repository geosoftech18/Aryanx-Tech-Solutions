"use server"
import prisma from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { Prisma, Role } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

export async function updateAboutUsMain(data: Prisma.AboutUsUpdateInput) {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")
  const aboutUs = await prisma.aboutUs.findFirst()
  if (!aboutUs) throw new Error("AboutUs not found")
  await prisma.aboutUs.update({
    where: { id: aboutUs.id },
    data,
  })
  return { success: true }
} 