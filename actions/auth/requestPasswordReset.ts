"use server";
import prisma from "@/lib/prismaDB";
import SendEmail, { getServerUrl } from "@/lib/sendEmail";
import crypto from "crypto";

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.emailVerified || user.accountSource !== "CREDENTIAL") {
    // Always return success for security
    return { success: true, message: "If your account exists, a reset link has been sent." };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    },
  });

  const baseUrl = await getServerUrl();
  const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;
  const html = `
    <p>You requested a password reset. <a href="${resetUrl}">Click here to reset your password</a>.</p>
    <p>This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
  `;

  await SendEmail({
    to: email,
    subject: "Reset your password",
    html,
  });

  return { success: true, message: "If your account exists, a reset link has been sent." };
} 