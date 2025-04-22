"use server";

import prismadb from "@/lib/prismaDB";

export async function isEmailVerified(email: string): Promise<{
  success: boolean;
  emailVerified?: boolean;
  message: string;
}> {
  try {
    // Validate email
    if (!email) {
      return {
        success: false,
        message: "Email is required",
      };
    }

    // Find user by email
    const user = await prismadb.user.findUnique({
      where: { email },
      select: { emailVerified: true },
    });

    if (!user || !user.emailVerified) {
      return {
        success: false,
        message: "Email verification status is false, Please verify your email",
      };
    }

    return {
      success: true,
      emailVerified: user.emailVerified,
      message: "Email verification status retrieved successfully",
    };
  } catch (error) {
    console.error("Error fetching email verification status:", error);
    return {
      success: false,
      message: "An error occurred while fetching email verification status",
    };
  }
}