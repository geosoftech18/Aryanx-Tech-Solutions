"use server";

import prismadb from "@/lib/prismaDB";
import { Job, JobType, JobCategory } from "@prisma/client";

interface SearchParams {
  q?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  type?: JobType;
  category?: JobCategory;
  industry?: string;
  sector?: string;
}

/**
 * Fetches jobs based on search parameters
 * @param searchParams - Search parameters including query and location
 * @returns Array of jobs matching the search criteria
 */
export async function getJobs(searchParams: SearchParams): Promise<(Job & { company: { name: string; logo?: string | null } })[]> {
  try {
    const where: any = {};

    // Text search
    if (searchParams.q) {
      where.OR = [
        { title: { contains: searchParams.q, mode: 'insensitive' } },
        { description: { contains: searchParams.q, mode: 'insensitive' } },
        { skills: { has: searchParams.q } }
      ];
    }

    // Location filter
    if (searchParams.location) {
      where.location = { contains: searchParams.location, mode: 'insensitive' };
    }

    // Salary range filter
    if (searchParams.salaryMin || searchParams.salaryMax) {
      where.salary = {};
      if (searchParams.salaryMin) {
        where.salary.gte = searchParams.salaryMin;
      }
      if (searchParams.salaryMax) {
        where.salary.lte = searchParams.salaryMax;
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

    const jobs = await prismadb.job.findMany({
      where,
      include: {
        company: {
          select: {
            name: true,
            logo: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }
} 