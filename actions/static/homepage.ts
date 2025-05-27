"use server"

import { getFeaturedJobs } from "@/actions/jobs/get-featured-jobs"
import { getJobCategoriesWithCounts } from "@/actions/jobs/get-job-categories"
import prismadb from "@/lib/prismaDB"
import { Homepage, Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { Role } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

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

// /**
//  * Updates the homepage data. Only accessible by admin users.
//  * @param input - The new homepage data to update
//  * @returns The updated homepage data or an error if unauthorized
//  */
// export async function updateHomepage(input: Prisma.HomepageUpdateInput): Promise<{ success: boolean; homepage?: HomepageWithRelations; error?: string }> {
//   // Check for admin session
//   const session = await getServerSession(NEXT_AUTH_CONFIG)
//   if (!session || session.user.role !== Role.ADMIN) {
//     console.log("[updateHomepage] Unauthorized session", session);
//     return { success: false, error: "Unauthorized" }
//   }

//   // Log the input
//   console.log("[updateHomepage] Received input:", JSON.stringify(input, null, 2));

//   // Find the homepage document
//   const homepage = await prismadb.homepage.findFirst()
//   console.log("[updateHomepage] Found homepage:", homepage);
//   if (!homepage) {
//     return { success: false, error: "Homepage not found" }
//   }

//   console.log("[updateHomepage] Input:", input);

//   const homepageId = homepage.id;

//   // Prepare Prisma update input with correct nested writes for MongoDB
//   const updateData: Prisma.HomepageUpdateInput = {
//     searchTitle: input.searchTitle,
//     searchSubtitle: input.searchSubtitle,
//     categoryTitle: input.categoryTitle,
//     categorySubtitle: input.categorySubtitle,
//     partnerTitle: input.partnerTitle,
//     partnerSubtitle: input.partnerSubtitle,
//     statsTitle: input.statsTitle,
//     statsSubtitle: input.statsSubtitle,
//     stepsTitle: input.stepsTitle,
//     stepsSubtitle: input.stepsSubtitle,
//     featureSlides: Array.isArray(input.featureSlides)
//       ? {
//           update: input.featureSlides
//             .filter((item: any) => item.id)
//             .map((item: any) => ({
//               where: { id: item.id },
//               data: {
//                 heading: item.heading,
//                 subheading: item.subheading,
//                 description: item.description,
//                 buttonText: item.buttonText,
//                 buttonLink: item.buttonLink,
//                 image: item.image,
//                 color: item.color,
//                 homepageId,
//               },
//             })),
//           create: input.featureSlides
//             .filter((item: any) => !item.id)
//             .map((item: any) => ({
//               heading: item.heading,
//               subheading: item.subheading,
//               description: item.description,
//               buttonText: item.buttonText,
//               buttonLink: item.buttonLink,
//               image: item.image,
//               color: item.color,
//               homepageId,
//             })),
//           deleteMany: (input.featureSlides as any).delete
//             ? (input.featureSlides as any).delete.map((d: any) => ({ id: d.id }))
//             : undefined,
//         }
//       : undefined,
//     partner: Array.isArray(input.partner)
//       ? {
//           update: input.partner
//             .filter((item: any) => item.id)
//             .map((item: any) => ({
//               where: { id: item.id },
//               data: {
//                 name: item.name,
//                 logoUrl: item.logoUrl,
//                 website: item.website || undefined,
//                 homepageId,
//               },
//             })),
//           create: input.partner
//             .filter((item: any) => !item.id)
//             .map((item: any) => ({
//               name: item.name,
//               logoUrl: item.logoUrl,
//               website: item.website || undefined,
//               homepageId,
//             })),
//           deleteMany: (input.partner as any).delete
//             ? (input.partner as any).delete.map((d: any) => ({ id: d.id }))
//             : undefined,
//         }
//       : undefined,
//     stats: Array.isArray(input.stats)
//       ? {
//           update: input.stats
//             .filter((item: any) => item.id)
//             .map((item: any) => ({
//               where: { id: item.id },
//               data: {
//                 percentage: item.percentage,
//                 description: item.description,
//                 homepageId,
//               },
//             })),
//           create: input.stats
//             .filter((item: any) => !item.id)
//             .map((item: any) => ({
//               percentage: item.percentage,
//               description: item.description,
//               homepageId,
//             })),
//           deleteMany: (input.stats as any).delete
//             ? (input.stats as any).delete.map((d: any) => ({ id: d.id }))
//             : undefined,
//         }
//       : undefined,
//     steps: Array.isArray(input.steps)
//       ? {
//           update: input.steps
//             .filter((item: any) => item.id)
//             .map((item: any) => ({
//               where: { id: item.id },
//               data: {
//                 icon: item.icon,
//                 title: item.title,
//                 description: item.description,
//                 homepageId,
//               },
//             })),
//           create: input.steps
//             .filter((item: any) => !item.id)
//             .map((item: any) => ({
//               icon: item.icon,
//               title: item.title,
//               description: item.description,
//               homepageId,
//             })),
//           deleteMany: (input.steps as any).delete
//             ? (input.steps as any).delete.map((d: any) => ({ id: d.id }))
//             : undefined,
//         }
//       : undefined,
//     cta: Array.isArray(input.cta)
//       ? {
//           update: input.cta
//             .filter((item: any) => item.id)
//             .map((item: any) => ({
//               where: { id: item.id },
//               data: {
//                 title: item.title,
//                 subtitle: item.subtitle,
//                 button1Text: item.button1Text,
//                 button1Link: item.button1Link,
//                 button2Text: item.button2Text,
//                 button2Link: item.button2Link,
//                 homepageId,
//               },
//             })),
//           create: input.cta
//             .filter((item: any) => !item.id)
//             .map((item: any) => ({
//               title: item.title,
//               subtitle: item.subtitle,
//               button1Text: item.button1Text,
//               button1Link: item.button1Link,
//               button2Text: item.button2Text,
//               button2Link: item.button2Link,
//               homepageId,
//             })),
//           deleteMany: (input.cta as any).delete
//             ? (input.cta as any).delete.map((d: any) => ({ id: d.id }))
//             : undefined,
//         }
//       : undefined,
//   };
//   console.log("[updateHomepage] Prisma update data:", JSON.stringify(updateData, null, 2));

//   try {
//     const updatedHomepage = await prismadb.homepage.update({
//       where: { id: homepage.id },
//       data: updateData,
//       include: {
//         featureSlides: true,
//         partner: true,
//         stats: true,
//         steps: true,
//         cta: true,
//       },
//     });
//     console.log("[updateHomepage] Updated homepage:", updatedHomepage);
//     return { success: true, homepage: updatedHomepage };
//   } catch (error) {
//     console.error("[updateHomepage] Prisma update error:", error);
//     return { success: false, error: error instanceof Error ? error.message : String(error) };
//   }
// } 