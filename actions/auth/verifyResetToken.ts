"use server";
import prisma from "@/lib/prismaDB";

export async function verifyResetToken(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() },
    },
  });
  return !!user;
} 