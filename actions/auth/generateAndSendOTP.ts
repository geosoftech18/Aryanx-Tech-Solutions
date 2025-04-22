"use server"

import prismadb from "@/lib/prismaDB";
import SendEmail from "@/lib/sendEmail";
import { Role } from "@prisma/client";

export const generateAndSendOTP = async (email: string, role: Role): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      // Verify the user exists
      const user = await prismadb.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }
  
      // Verify the user's role matches the requested role
      if (user.role !== role) {
        return {
          success: false,
          message: "User role doesn't match the requested role",
        };
      }
  
      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      // Update the user with the new OTP
      await prismadb.user.update({
        where: { email },
        data: { otp },
      });
  
      // Send the OTP via email
      await SendEmail({
        to: email,
        subject: "Your Login OTP Code",
        html: `
          <div>
            <h2>Your Login OTP</h2>
            <p>Here is your one-time password:</p>
            <h3>${otp}</h3>
            <p>This OTP will expire after use.</p>
          </div>
        `,
      });
  
      return {
        success: true,
        message: "OTP sent successfully to your email",
      };
    } catch (error) {
      console.error("Error in OTP generation:", error);
      return {
        success: false,
        message: "Failed to generate and send OTP. Please try again.",
      };
    }
  };