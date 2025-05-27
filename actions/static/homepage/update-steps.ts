"use server";
import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { HomepageStep, Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

/**
 * Updates multiple homepage steps by their id.
 * @param steps Array of HomepageStep objects (must include id, icon, title, description)
 */
export async function updateSteps(steps: Pick<HomepageStep, "id" | "icon" | "title" | "description">[]) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");
  for (const step of steps) {
    await prismadb.homepageStep.update({
      where: { id: step.id },
      data: {
        icon: step.icon,
        title: step.title,
        description: step.description,
      },
    });
  }
  return { success: true };
} 