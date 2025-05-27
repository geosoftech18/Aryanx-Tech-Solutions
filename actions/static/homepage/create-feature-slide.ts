"use server";
import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Prisma, Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function createFeatureSlide(data: Prisma.HomepageFeatureSlideCreateInput) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");
  const homepage = await prismadb.homepage.findFirst();
  if (!homepage) throw new Error("Homepage not found");
  const { homepage: _, color: _color, ...rest } = data;
  return await prismadb.homepageFeatureSlide.create({
    data: { ...rest, homepageId: homepage.id, color: "from-emerald-600 to-teal-700" },
  });
}

// New: update a feature slide by id
export async function updateFeatureSlide(id: string, data: Partial<Omit<Prisma.HomepageFeatureSlideUpdateInput, "homepage">>) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");
  // Always set color to the hardcoded value
  const { color: _color, ...rest } = data;
  return await prismadb.homepageFeatureSlide.update({
    where: { id },
    data: { ...rest, color: "from-emerald-600 to-teal-700" },
  });
} 