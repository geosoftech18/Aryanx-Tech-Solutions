"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

/**
 * List all candidates for admin combobox selection.
 * Only accessible by ADMIN role.
 */
export async function listCandidatesForCombobox(): Promise<{ label: string; value: string }[]> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");

  const candidates = await prismadb.candidate.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return candidates.map((c) => ({
    label: `${c.user.firstname} ${c.user.lastname}`,
    value: c.id,
  }));
} 