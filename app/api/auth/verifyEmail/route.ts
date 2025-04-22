// app/api/auth/verify-email/route.ts
import { EmailVerificationService } from "@/lib/emailVerification";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    const user = await EmailVerificationService.verifyToken(token);

    return NextResponse.json(
      { success: true, message: "Email verified successfully", user: user.name },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Verification failed" },
      { status: 400 }
    );
  }
}
