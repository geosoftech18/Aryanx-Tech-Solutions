"use server";
import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Prisma, Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function updateHomepageMain(data: Prisma.HomepageUpdateInput) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");
  const homepage = await prismadb.homepage.findFirst();
  if (!homepage) throw new Error("Homepage not found");
  await prismadb.homepage.update({
    where: { id: homepage.id },
    data,
  });
  return { success: true };
} 