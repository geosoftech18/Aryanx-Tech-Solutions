"use server";
import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Prisma, Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function createPartner(data: Prisma.PartnerCreateInput) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");
  const homepage = await prismadb.homepage.findFirst();
  if (!homepage) throw new Error("Homepage not found");
  const { homepage: _, ...rest } = data;
  return await prismadb.partner.create({
    data: { ...rest, homepageId: homepage.id },
  });
}

// New: update a partner by id
export async function updatePartner(id: string, data: Partial<Omit<Prisma.PartnerUpdateInput, "homepage">>) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");
  return await prismadb.partner.update({
    where: { id },
    data,
  });
} 