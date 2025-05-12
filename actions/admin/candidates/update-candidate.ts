"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Role, CandidateType, Gender, LGBTQ, PwdCategory, Prisma } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";



/**
 * Update a candidate by admin.
 * Only accessible by ADMIN role.
 */
export async function updateCandidateAdmin(candidateId: string, input: Prisma.CandidateUpdateInput): Promise<{ success: boolean; error?: string }> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) return { success: false, error: "Unauthorized" };

  try {
    // Update candidate
    await prismadb.candidate.update({
      where: { id: candidateId },
      data: input,
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update candidate" };
  }
} 