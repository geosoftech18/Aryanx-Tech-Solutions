"use server";

import prismadb from "@/lib/prismaDB";
import { Job, Company } from "@prisma/client";

type JobParams = Pick<Job, "workMode" | "type" | "category">;
type CompanyParams = Pick<Company, "industry" | "sector">;

export interface SearchParams extends JobParams, CompanyParams {
  q?: string;
  location?: string;
  salaryMin?: string;
  salaryMax?: string;
}

// salaryMin and salaryMax are strings as searchParams are strings only, so we need to convert them to numbers

/**
 * Fetches jobs based on search parameters
 * @param searchParams - Search parameters including query and location
 * @returns Array of jobs matching the search criteria
 */
export async function getJobs(
  searchParams: SearchParams
): Promise<(Job & { company: { name: string; logo?: string | null } })[]> {
  try {
    const where: any = {};

    // Text search
    if (searchParams.q) {
      where.OR = [
        { title: { contains: searchParams.q, mode: "insensitive" } },
        { description: { contains: searchParams.q, mode: "insensitive" } },
        { skills: { has: searchParams.q } },
        {
          company: { name: { contains: searchParams.q, mode: "insensitive" } },
        },
      ];
    }
    // Salary range filter
    if (searchParams.salaryMin || searchParams.salaryMax) {
      where.salary = {};
      if (searchParams.salaryMin) {
        where.salary.gte = parseInt(searchParams.salaryMin);
      }
      if (searchParams.salaryMax) {
        where.salary.lte = parseInt(searchParams.salaryMax);
      }
    }

    // Job type filter
    if (searchParams.type) {
      where.type = searchParams.type;
    }

    // Category filter
    if (searchParams.category) {
      where.category = searchParams.category;
    }

    // Industry and sector filters (assuming these are fields in the company model)
    if (searchParams.industry || searchParams.sector) {
      where.company = {};
      if (searchParams.industry) {
        where.company.industry = searchParams.industry;
      }
      if (searchParams.sector) {
        where.company.sector = searchParams.sector;
      }
    }

    if (searchParams.workMode) {
      where.workMode = searchParams.workMode;
    }

    const jobs = await prismadb.job.findMany({
      where,
      include: {
        company: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    let filteredJobs = jobs;
    // Case-insensitive location filter, matching starting letters
    if (searchParams.location) {
      const loc = searchParams.location.toLowerCase();
      filteredJobs = filteredJobs.filter((job) =>
        job.location.some((l) => l.toLowerCase().startsWith(loc))
      );
    }

    return filteredJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }
}
