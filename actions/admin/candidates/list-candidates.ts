"use server";

import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { Role, Candidate, User } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { listCandidatesFiltersSchema, ListCandidatesFilters } from "@/actions/admin/utils/parse-filters";

export interface CandidateWithUser extends Candidate {
  user: User;
}

/**
 * List candidates for admin table with search, pagination, and sorting.
 * Only accessible by ADMIN role.
 */
export async function listCandidates(rawFilters: Partial<ListCandidatesFilters> = {}): Promise<CandidateWithUser[]> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");

  // Validate and parse filters
  const filters = listCandidatesFiltersSchema.parse(rawFilters);
  const { search = "", page = 1, pageSize = 10, sortBy = "createdAt", sortOrder = "desc", candidateType, gender, YOE } = filters;

  let userIds: string[] = [];
  if (search) {
    const users = await prismadb.user.findMany({
      where: {
        OR: [
          { firstname: { contains: search, mode: "insensitive" } },
          { lastname: { contains: search, mode: "insensitive" } },
        ],
      },
      select: { id: true },
    });
    userIds = users.map((u) => u.id);
  }

  // Build where filter
  let where: any = {};
  const orFilters = [];
  if (search) {
    if (userIds.length > 0) {
      orFilters.push({ userId: { in: userIds } });
    }
    orFilters.push({ skills: { has: search } });
  }
  if (orFilters.length > 0) {
    where.OR = orFilters;
  }
  if (candidateType) {
    where.candidateType = candidateType;
  }
  if (gender) {
    where.gender = gender;
  }
  if (typeof YOE === "number") {
    where.YOE = YOE;
  }

  const candidates = await prismadb.candidate.findMany({
    where,
    include: { user: true },
    orderBy:
      sortBy === "name"
        ? { user: { firstname: sortOrder } }
        : { [sortBy]: sortOrder },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return candidates;
} 