"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyResetToken } from "@/actions/auth/verifyResetToken";
import { resetPassword } from "@/actions/auth/resetPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [valid, setValid] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setValid(false);
      setLoading(false);
      return;
    }
    verifyResetToken(token).then(setValid).finally(() => setLoading(false));
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await resetPassword(token, password);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 2000);
    } else {
      setError(res.message || "Invalid or expired token.");
    }
    setLoading(false);
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  if (success)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow text-center">
          <div className="text-green-600 font-bold mb-2">Password reset successful!</div>
          <div>Redirecting to login...</div>
        </div>
      </div>
    );

  if (!valid)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow text-center">
          <div className="text-red-600 font-bold mb-2">Invalid or expired link.</div>
          <div>
            This reset link is one-time use or expired. <br />
            <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">Request a new link</Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Enter new password"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input
              id="confirm"
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              minLength={6}
              placeholder="Confirm new password"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
} 