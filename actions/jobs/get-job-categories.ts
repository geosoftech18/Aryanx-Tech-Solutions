"use server";

import prismadb from "@/lib/prismaDB";
import { JobCategory } from "@prisma/client";

/**
 * Fetches all distinct job categories along with the count of jobs in each category
 * @returns Array of objects containing category and count
 */
export async function getJobCategoriesWithCounts(): Promise<{ category: JobCategory; count: number }[]> {
  try {
    // Using MongoDB's aggregation pipeline to get distinct categories and counts
    const categoriesWithCounts = await prismadb.job.groupBy({
      by: ['category'],
      _count: {
        category: true
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      }
    });

    // Transform the result to match the expected format
    return categoriesWithCounts.map((item: { category: JobCategory; _count: { category: number } }) => ({
      category: item.category,
      count: item._count.category
    }));
  } catch (error) {
    console.error("Error fetching job categories:", error);
    throw new Error("Failed to fetch job categories");
  }
} 