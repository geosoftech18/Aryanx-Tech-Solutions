"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, Linkedin } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { isEmailVerified } from "@/actions/auth/isEmailVerified";
import { Role } from "@prisma/client";
import { getRole } from "@/actions/auth/getRole";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { generateAndSendOTP } from "@/actions/auth/generateAndSendOTP";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const isEmailVerifiedResponse: {
        success: boolean;
        emailVerified?: boolean;
        message: string;
      } = await isEmailVerified(email);

      if (!isEmailVerifiedResponse.success) {
        toast.error(isEmailVerifiedResponse.message);
        return;
      }

      const getRoleResponse: {
        success: boolean;
        role?: Role;
        message: string;
      } = await getRole(email);

      if (!getRoleResponse.success || !getRoleResponse.role) {
        toast.error(getRoleResponse.message);
        return;
      }

      //   console.log(isEmailVerifiedResponse,getRoleResponse);

      const sendOTPResponse: {
        success: boolean;
        role?: Role;
        message: string;
      } = await generateAndSendOTP(email, getRoleResponse.role);

      if (!sendOTPResponse.success) {
        toast.error(sendOTPResponse.message);
        return;
      } else {
        toast.success(sendOTPResponse.message);
      }
      setShowOtpInput(true);
    } catch (error) {
      toast.error("Some error occured while handling signin");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || !email || !password) {
      toast.error("Somthing went wrong, please try again");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        // redirect: false,
        email,
        otp,
        role: "CANDIDATE",
        callbackUrl:`${process.env.NEXT_PUBLIC_BASE_URL}/candidate`
      });

      if (res?.error) {
        toast.error(res.error);
      } else if (res?.ok) {
        toast.success("Successfully signed in!");
        // Redirect to dashboard or appropriate page
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-8">
        <div className="max-w-[450px] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Log in</h2>
          <p className="text-sm text-gray-600 mb-8">
            Enter your account details here
          </p>

          {!showOtpInput ? (
            <form className="space-y-6" onSubmit={handleSignIn}>
              <div>
                <Label className="text-sm font-medium" htmlFor="email">
                  Email address
                </Label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-gray-300"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium" htmlFor="password">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgotten?
                  </Link>
                </div>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-gray-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleOtpSubmit}>
              <div>
                <Label className="text-sm font-medium" htmlFor="otp">
                  Enter OTP
                </Label>
                <div className="mt-1.5 relative">
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    {/* <InputOTPSeparator /> */}
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying OTP...
                  </>
                ) : (
                  "Submit OTP"
                )}
              </Button>
            </form>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Button
                variant="outline"
                type="button"
                className="w-full border-2 border-gray-300"
              >
                <Linkedin className="mr-2 h-5 w-5 text-[#0077B5]" />
                Sign in with LinkedIn
              </Button>
            </div>

            <p className="mt-8 text-xs text-gray-500 text-center">
              Not your device? Remember to log out after your session
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Sign Up CTA */}
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-8">
        <div className="max-w-[450px] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sign up</h2>
          <Image
            src="/jobFilter.png"
            alt="Job search illustration"
            className="w-full rounded-lg mb-8"
            width={500}
            height={500}
          />
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-4 w-4 text-green-500">✓</div>
              </div>
              <p className="ml-2 text-sm text-gray-600">
                View your job matches and saved jobs on any device
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-4 w-4 text-green-500">✓</div>
              </div>
              <p className="ml-2 text-sm text-gray-600">
                Apply for jobs with one click
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-4 w-4 text-green-500">✓</div>
              </div>
              <p className="ml-2 text-sm text-gray-600">
                Manage your job alerts
              </p>
            </div>
          </div>
          <Link href="/auth/signup">
            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-blue-700 text-blue-700 hover:bg-blue-50"
            >
              Create an account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
