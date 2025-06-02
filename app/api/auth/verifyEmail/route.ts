// app/api/auth/verify-email/route.ts
import { EmailVerificationService } from "@/lib/emailVerification";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return new Response(
        `<!DOCTYPE html><html><head><title>Email Verification</title><style>body{font-family:sans-serif;background:#f8fafc;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;} .card{background:#fff;padding:2rem 2.5rem;border-radius:12px;box-shadow:0 2px 16px #0001;text-align:center;} .error{color:#dc2626;font-weight:600;} a{color:#2563eb;text-decoration:none;}</style></head><body><div class="card"><div class="error">Verification token is required.</div><div><a href='/auth/login'>Go to Login</a></div></div></body></html>`,
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    const user = await EmailVerificationService.verifyToken(token);

    return new Response(
      `<!DOCTYPE html><html><head><title>Email Verified</title><style>body{font-family:sans-serif;background:#f8fafc;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;} .card{background:#fff;padding:2rem 2.5rem;border-radius:12px;box-shadow:0 2px 16px #0001;text-align:center;} .success{color:#16a34a;font-weight:600;} a{color:#2563eb;text-decoration:none;}</style></head><body><div class="card"><div class="success">Email verified successfully!</div><div>Welcome, <b>${user.firstname}</b>!</div><div style="margin-top:1.5rem"><a href='/auth/login'>Go to Login</a></div></div></body></html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return new Response(
      `<!DOCTYPE html><html><head><title>Email Verification Error</title><style>body{font-family:sans-serif;background:#f8fafc;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;} .card{background:#fff;padding:2rem 2.5rem;border-radius:12px;box-shadow:0 2px 16px #0001;text-align:center;} .error{color:#dc2626;font-weight:600;} a{color:#2563eb;text-decoration:none;}</style></head><body><div class="card"><div class="error">${error instanceof Error ? error.message : "Verification failed"}</div><div><a href='/auth/login'>Go to Login</a></div></div></body></html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }
}
