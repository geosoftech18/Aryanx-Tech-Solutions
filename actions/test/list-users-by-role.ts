"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export interface UserLite {
  id: string;
  name: string;
  role: "CANDIDATE" | "EMPLOYER" | "ADMIN";
}

/**
 * Fetch all users by role for socket test environment.
 * Returns id, name, and role for each user.
 * Only accessible by authenticated users.
 */
export async function listUsersByRole(role: "CANDIDATE" | "EMPLOYER" | "ADMIN"): Promise<UserLite[]> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || !session.user) throw new Error("Unauthorized");

  // Fetch users by role
  const users = await prismadb.user.findMany({
    where: { role: role as Role },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      role: true,
    },
    orderBy: { firstname: "asc" },
  });

  return users.map((u) => ({
    id: u.id,
    name: `${u.firstname} ${u.lastname}`.trim(),
    role: u.role as "CANDIDATE" | "EMPLOYER" | "ADMIN",
  }));
} 