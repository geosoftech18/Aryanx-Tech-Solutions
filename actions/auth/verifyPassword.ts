"use server";

import prismadb from "@/lib/prismaDB";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

/**
 * Verifies a user's password by comparing the provided password with the stored hash.
 * @param email - The user's email address
 * @param password - The plain text password to verify
 * @returns An object with success boolean and message
 */
export async function verifyPassword(email: string, password: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Validate input
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required.",
      };
    }

    // Find user by email (only select password field)
    const user = await prismadb.user.findUnique({
      where: { email },
      select: { password: true, accountSource: true },
    });

    if (!user ) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (user.accountSource === "LINKEDIN") {
      return {
        success: false,
        message: "This account is sourced from LinkedIn. Please use login with LinkedIn.",
      };
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Incorrect password.",
      };
    }

    return {
      success: true,
      message: "Password verified successfully.",
    };
  } catch (error) {
    console.error("Error verifying password:", error);
    return {
      success: false,
      message: "An error occurred while verifying the password.",
    };
  }
} 