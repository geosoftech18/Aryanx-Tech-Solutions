// actions/auth/resendVerification.ts
'use server';

import { EmailVerificationService } from "@/lib/emailVerification";
import prismadb from "@/lib/prismaDB";

export async function resendVerificationEmail(email: string) {
  try {
    const user = await prismadb.user.findUnique({
      where: { email },
      select: { emailVerified: true },
    });

    if (user?.emailVerified) {
      throw new Error('Email is already verified');
    }

    await EmailVerificationService.createVerificationRequest(email);
    return { success: true };
  } catch (error) {
    console.error('Error resending verification:', error);
    throw error;
  }
}