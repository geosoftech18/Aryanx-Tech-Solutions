"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

/**
 * Delete a candidate by admin. If candidate has applications, delete them first.
 * Only accessible by ADMIN role.
 */
export async function deleteCandidate(candidateId: string): Promise<void> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");

  // Delete related applications first
  await prismadb.application.deleteMany({ where: { candidateId } });

  // Delete the candidate
  await prismadb.candidate.delete({ where: { id: candidateId } });
} 