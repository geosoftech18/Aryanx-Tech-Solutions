"use server";
import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function deleteFeatureSlide(id: string) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");
  await prismadb.homepageFeatureSlide.delete({ where: { id } });
  return { success: true };
} 