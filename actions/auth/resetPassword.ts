"use server";
import prisma from "@/lib/prismaDB";
import bcrypt from "bcryptjs";

export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() },
    },
  });
  if (!user) {
    return { success: false, message: "Invalid or expired token." };
  }
  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
  return { success: true };
} 