"use client";
import { useState } from "react";
import { requestPasswordReset } from "@/actions/auth/requestPasswordReset";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await requestPasswordReset(email);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        {submitted ? (
          <div className="text-green-600 text-center">
            If your account exists, a reset link has been sent to your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </form>
        )}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t remember your email? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
        </div>
      </div>
    </div>
  );
} 