"use server";

import prismadb from "@/lib/prismaDB";

export async function isEmployerProfileComplete(userId: string): Promise<{
  success: boolean;
  isComplete?: boolean;
  message: string;
}> {
  try {
    // Validate userId
    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    // Find candidate by userId
    const company = await prismadb.company.findUnique({
      where: { userId },
      select: {
        name: true,
        description: true,
        industry: true,
        sector: true,
      },
    });

    // If no candidate exists for the given userId
    if (!company) {
      return {
        success: false,
        isComplete: false,
        message:
          "Employer profile does not exist. Please complete your profile.",
      };
    }

    // Check if all required fields are set
    const isComplete =
      !!company.name &&
      !!company.description &&
      !!company.industry &&
      !!company.sector;

    if (!isComplete) {
      return {
        success: false,
        isComplete: false,
        message:
          "Employer profile is incomplete. Please fill in all required fields.",
      };
    }

    return {
      success: true,
      isComplete: true,
      message: "Employer profile is complete.",
    };
  } catch (error) {
    console.error("Error checking employer profile completeness:", error);
    return {
      success: false,
      message:
        "An error occurred while checking employer profile completeness.",
    };
  }
}
