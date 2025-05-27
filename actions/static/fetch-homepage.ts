"use server"

import { getFeaturedJobs } from "@/actions/jobs/get-featured-jobs"
import { getJobCategoriesWithCounts } from "@/actions/jobs/get-job-categories"
import prismadb from "@/lib/prismaDB"
import { Homepage, Prisma } from "@prisma/client"

// Define the return type for the homepage fetch
export type HomepageWithRelations = Prisma.HomepageGetPayload<{
    include: {
      featureSlides: true,
      partner: true,
      stats: true,
      steps: true,
      cta: true,
    }
  }>;

export type HomepageData = {
  homepage: HomepageWithRelations | null
  featuredJobs: Awaited<ReturnType<typeof getFeaturedJobs>>
  jobCategories: Awaited<ReturnType<typeof getJobCategoriesWithCounts>>
}

/**
 * Fetches all homepage content including static homepage data, featured jobs, and job categories.
 * Returns a single object with all homepage data for rendering.
 */
export async function fetchHomepage(): Promise<HomepageData> {
  // Fetch homepage static content (titles, slides, partners, stats, steps, cta)
  const homepage = await prismadb.homepage.findFirst({
    include: {
      featureSlides: true,
      partner: true,
      stats: true,
      steps: true,
      cta: true,
    },
  })

  // Fetch featured jobs (dynamic)
  const featuredJobs = await getFeaturedJobs()

  // Fetch job categories with counts (dynamic)
  const jobCategories = await getJobCategoriesWithCounts()

  return {
    homepage,
    featuredJobs,
    jobCategories,
  }
} 