"use server";
import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { HomepageStat, Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

/**
 * Updates multiple homepage stats by their id.
 * @param stats Array of HomepageStat objects (must include id, percentage, description)
 */
export async function updateStats(stats: Pick<HomepageStat, "id" | "percentage" | "description">[]) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");
  for (const stat of stats) {
    await prismadb.homepageStat.update({
      where: { id: stat.id },
      data: {
        percentage: stat.percentage,
        description: stat.description,
      },
    });
  }
  return { success: true };
} 