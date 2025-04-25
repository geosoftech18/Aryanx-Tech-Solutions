"use client";

import { Button } from "@/components/ui/button";
import { AlertOctagon, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  company: string;
  jobTitle: string;
}

const JobApplyBox = ({ company }: Props) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  return (
    <div className="bg-white/80 dark:bg-background/70 rounded-xl shadow-2xl p-8 animate-fade-in border border-blue-100 mt-8">
      <h2 className="text-2xl font-bold mb-5 text-blue-900 dark:text-white">
        Apply for this job
      </h2>
      <div className="mb-5 p-4 bg-blue-50/90 border border-blue-200 rounded-md flex items-center gap-2">
        <AlertOctagon className="h-5 w-5 text-blue-600" />
        {userRole === "CANDIDATE" ? (
          <span className="text-blue-700 text-sm">
            Your profile will be shared with <b>{company}</b>. Please ensure
            your info is complete and up to date.
          </span>
        ) : (
          <span className="text-blue-700 text-sm">
            Please login as a candidate to apply for this job
          </span>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        {userRole === "CANDIDATE" ? (
          <Button className="bg-gradient-to-r cursor-pointer from-blue-600 to-violet-600 text-white shadow-lg hover:scale-105 transition-transform">
            <Send className="mr-2 h-4 w-4" />
            Submit Application
          </Button>
        ) : (
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r cursor-pointer from-blue-600 to-violet-600 text-white shadow-lg hover:scale-105 transition-transform">
              <Send className="mr-2 h-4 w-4" />
              Login to apply
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobApplyBox;
