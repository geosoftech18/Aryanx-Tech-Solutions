"use server";
// basically this is used to get the role of the user when user is not logged in
import prismadb from "@/lib/prismaDB";
import { Role } from "@prisma/client";

export async function getRole(email: string): Promise<{
  success: boolean;
  role?: Role;
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
      select: { role: true },
    });

    if (!user) {
      return {
        success: false,
        message: "User's role not found",
      };
    }

    return {
      success: true,
      role: user.role,
      message: "User role retrieved successfully",
    };
  } catch (error) {
    console.error("Error fetching user role:", error);
    return {
      success: false,
      message: "An error occurred while fetching user role",
    };
  }
}