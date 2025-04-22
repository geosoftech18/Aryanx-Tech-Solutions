"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Mail, Lock, Briefcase, Loader2, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { createUser } from "@/actions/auth/createUser";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [midName, setMidName]  = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("candidate");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error( "Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      const res = await createUser({
        email: email,
         password: password,
         firstname:firstName, 
         middlename: midName,
         lastname: lastName
      })

      if(res.success && res.message){
        toast.success(res.message);
      }else{
        toast.error(res.message)
      }
     

      // Reset form or redirect to login
      // history.push("/login");
    } catch (error) {
      toast.error("There was an error creating your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <MainLayout>
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      {/* Left Section - Registration Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-8">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Sign up</h2>
          <p className="text-sm text-gray-600 mb-8">
            Enter your account details here
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Label>I want to register as a:</Label>
              <RadioGroup
                defaultValue="candidate"
                value={userType}
                onValueChange={setUserType}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                  <RadioGroupItem value="candidate" id="candidate" />
                  <Label
                    htmlFor="candidate"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Candidate</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label
                    htmlFor="recruiter"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <span>Recruiter</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium">First name</Label>
                <Input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1.5 border-gray-300"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Middle name</Label>
                <Input
                  type="text"
                  value={midName}
                  onChange={(e) => setMidName(e.target.value)}
                  className="mt-1.5 border-gray-300"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Last name</Label>
                <Input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1.5 border-gray-300"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Email address</Label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-300"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Password</Label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-gray-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Confirm Password</Label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 border-gray-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-500"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                type="button"
                className="w-full border-2 border-gray-300"
              >
                <Linkedin className="mr-2 h-5 w-5 text-[#0077B5]" />
                Sign up with LinkedIn
              </Button>
            </div>

            <p className="mt-8 text-sm text-gray-500 text-center">
              Not your device? Remember to log out after your session
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Sign In CTA */}
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8">
        <div className="max-w-[350px] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Sign in using...
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            You can use your other social accounts to sign in
          </p>

          <div className="space-y-4">
            <Button
              variant="outline"
              type="button"
              className="w-full border-2 border-gray-300"
            >
              <Linkedin className="mr-2 h-5 w-5 text-[#0077B5]" />
              Sign in with LinkedIn
            </Button>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
    // </MainLayout>
  );
};

export default Signup;
