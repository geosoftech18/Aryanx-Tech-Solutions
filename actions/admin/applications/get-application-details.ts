"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Application, Candidate, Job, Company, User, Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

/**
 * Fetch a single application by ID for admin panel.
 * Only accessible by ADMIN role.
 */
export async function getApplicationDetails(applicationId: string): Promise<(Application & { candidate: (Candidate & { user: User }) | null; job: (Job & { company: Company }) | null }) | null> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");

  const application = await prismadb.application.findUnique({
    where: { id: applicationId },
    include: {
      Candidate: {
        include: {
          user: true,
        },
      },
      job: {
        include: {
          company: true,
        },
      },
    },
  });
  if (!application) return null;
  // Map to match expected type with lowercase 'candidate'
  return {
    ...application,
    candidate: application.Candidate,
    job: application.job,
  };
} 