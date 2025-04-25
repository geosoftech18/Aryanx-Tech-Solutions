"use server";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
// basically this is used to get the role of the user when user is logged in
import prismadb from "@/lib/prismaDB";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function getAuthenticatedUserRole(): Promise<{
  success: boolean;
  role?: Role;
  message: string;
}> {
  try {
    // Validate email
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session||!session.user||!session.user.email||!session.user.role) {
      return {
        success: false,
        message: "User is not logged in",
      };
    }

    return {
      success: true,
      role: session.user.role,
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