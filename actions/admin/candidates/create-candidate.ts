"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import {
  Role,
  CandidateType,
  Gender,
  LGBTQ,
  PwdCategory,
  Prisma,
} from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

/**
 * Create a candidate by admin. Also creates a user if needed.
 * Only accessible by ADMIN role.
 */
export async function createCandidateAdmin(
  input: Prisma.CandidateCreateInput
): Promise<{ success: boolean; error?: string }> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN)
    return { success: false, error: "Unauthorized" };

  try {
    const { user, ...rest } = input;
    // console.log(data)
    if (!user || !user.connect || !user.connect.id) {
      throw new Error("User (owner) is required to create a company.");
    }

    // Create candidate
    await prismadb.candidate.create({
      data: {
        ...rest,
        user: { connect: { id: user.connect.id } },
      },
    });
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to create candidate",
    };
  }
}
