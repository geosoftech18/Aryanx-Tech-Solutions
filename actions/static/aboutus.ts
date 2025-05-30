"use server"
import prisma from "@/lib/prismaDB"
import type { AboutUs, AboutUsTeamMember, AboutUsSpecialization, AboutUsStat, AboutUsTab, AboutUsWhyChooseUsCard } from "@prisma/client"

// Type for the full AboutUs page data with all relations
export interface AboutUsPageData extends AboutUs {
  teamMembers: AboutUsTeamMember[]
  specializations: AboutUsSpecialization[]
  stats: AboutUsStat[]
  tabs: AboutUsTab[]
  whyChooseUsCards: AboutUsWhyChooseUsCard[]
}

/**
 * Fetches the About Us page data from the database, including all related components.
 * Returns all static content and linked arrays for the About Us page.
 */
export async function getAboutUsPageData(): Promise<AboutUsPageData | null> {
  // Fetch the first (and only) AboutUs record with all relations
  const aboutUs = await prisma.aboutUs.findFirst({
    include: {
      teamMembers: true, // Fetch all team members
      specializations: true, // Fetch all specializations
      stats: true, // Fetch all stats
      tabs: true, // Fetch all DEIB tabs
      whyChooseUsCards: true, // Fetch all Why Choose Us cards
    },
  })
  // Return the full object or null if not found
  // console.log(aboutUs)
  return aboutUs as AboutUsPageData | null
} 