"use client";

import { createApplication } from "@/actions/application/create-application";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { CandidateType } from "@prisma/client";
import { AlertOctagon, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  company: string;
  jobTitle: string;
  jobId: string;
  employerId: string;
  candidateType: CandidateType;
  jobFor: CandidateType[];
}

const JobApplyBox = ({ company, jobId, candidateType, jobFor }: Props) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { connected, emit } = useSocket();

  const handleApply = async () => {
    if (!session?.user?.id) return;
    
    try {
      setIsSubmitting(true);

      // Create the application (notification is handled in the backend)
      const { success, application, notification, error } = await createApplication({
        jobId,
        userId: session.user.id,
      });

      if(success && notification && connected) {
        emit('emit-to-room', {
          room: `user-${notification.userId}`,
          event: 'new-notification',
          data: { notification }
        }); 
      }

      if (!success || !application?.id) {
        throw new Error(error || 'Failed to submit application');
      }

      toast.success('Application submitted successfully!');
      router.push('/CANDIDATE');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-background/70 rounded-xl shadow-2xl p-8 animate-fade-in border border-blue-100 mt-8">
      <h2 className="text-2xl font-bold mb-5 text-blue-900 dark:text-white">
        Apply for this job
      </h2>
      <div className="mb-5 p-4 bg-blue-50/90 border border-blue-200 rounded-md flex items-center gap-2">
        <AlertOctagon className="h-5 w-5 text-blue-600" />
        {userRole === "CANDIDATE" ? (
          jobFor.includes(candidateType) ? (
            <span className="text-blue-700 text-sm">
              Your profile will be shared with <b>{company}</b>. Please ensure
              your info is complete and up to date.
            </span>
          ) : (
            <span className="text-red-600 text-sm">
              This job is not for you.
            </span>
          )
        ) : (
          <span className="text-blue-700 text-sm">
            Please login as a candidate to apply for this job
          </span>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        {userRole === "CANDIDATE" && jobFor.includes(candidateType) ? (
          <Button 
            className="bg-gradient-to-r cursor-pointer from-blue-600 to-violet-600 text-white shadow-lg hover:scale-105 transition-transform"
            onClick={handleApply}
            disabled={isSubmitting}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        ) : userRole !== "CANDIDATE" ? (
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r cursor-pointer from-blue-600 to-violet-600 text-white shadow-lg hover:scale-105 transition-transform">
              <Send className="mr-2 h-4 w-4" />
              Login to apply
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default JobApplyBox;
