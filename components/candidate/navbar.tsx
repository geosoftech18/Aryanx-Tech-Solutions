"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface NavbarProps {
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">
                AryanXTech Solutions
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            {session && session.user.role && (
              <Link
                href={`/${session?.user.role.toLocaleLowerCase()}`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
            )}

            <Link
              href="/about-us"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              href="/ats-capabilities"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              ATS Capabilities
            </Link>
            <Link
              href="/why-choose-us"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Why Choose Us
            </Link>
            <Link
              href="/trainning-hub"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Trainning Hub
            </Link>
          </nav>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              // if session exists, then show the logout button
              <>
                <Button
                  onClick={() => {
                    signOut({
                      callbackUrl: "http://localhost:3000/auth/login",
                    });
                  }}
                >
                  Log Out
                </Button>
                <Avatar>
                  <AvatarFallback>
                    {session.user.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              // if session does not exist, then show the login signup buttons
              <>
                <Link href="/auth/login">
                  <Button size="sm">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="outline" size="sm">
                    Signup
                  </Button>
                </Link>
              </>
            )}

            {/* <Link > */}

            {/* </Link> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link
              href="/jobs"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Find Jobs
            </Link>
            <Link
              href="/employers"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              For Employers
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Contact
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Link href="/login" className="w-full">
                  <Button size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
              </div>
              <div className="mt-3">
                <Link href="/register" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
