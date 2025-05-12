import { getCandidateProfileData } from "@/actions/candidate-actions/getCandidateProfile";
import { getJobDetails } from "@/actions/jobs/get-job-details";
import { getSimilarJobs } from "@/actions/jobs/get-similar-jobs";
import JobApplyBox from "@/components/jobs/JobApplyBox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { CandidateType, JobCategory, JobType } from "@prisma/client";
import { format } from "date-fns";
import { Briefcase, Calendar, DollarSign, MapPin } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    jobId: string;
  }>;
}

interface SimilarJob {
  id: string;
  title: string;
  type: JobType;
  category: JobCategory;
  company: {
    name: string;
    logo: string | null;
  };
}

export default async function JobDetailsPage({ params }: PageProps) {
  const { jobId } = await params;
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const candidateType = (await getCandidateProfileData(session?.user.id))?.candidateType


  const jobDetails = await getJobDetails(jobId);
  if (!jobDetails) {
    notFound();
  }

  const similarJobs = await getSimilarJobs(jobId, jobDetails.category, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{jobDetails.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-medium">
                      {jobDetails.company.name}
                    </span>
                    {jobDetails.company.logo && (
                      <img
                        src={jobDetails.company.logo}
                        alt={jobDetails.company.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{jobDetails.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span>{jobDetails.type.replace(/_/g, " ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>
                    {jobDetails.salary
                      ? `$${jobDetails.salary.toLocaleString()}`
                      : "Not specified"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>
                    Posted{" "}
                    {format(new Date(jobDetails.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>{jobDetails.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobDetails.experience && (
                  <div>
                    <h3 className="font-medium">Experience</h3>
                    <p>{jobDetails.experience}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-medium">Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {jobDetails.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>About {jobDetails.company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>{jobDetails.company.description}</p>
                {jobDetails.company.website && (
                  <a
                    href={jobDetails.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          <JobApplyBox
            company={jobDetails.company.name}
            jobTitle={jobDetails.title}
            jobId={jobId}
            employerId={jobDetails.company.user.id}
            candidateType={candidateType as CandidateType}
            jobFor={jobDetails.jobFor}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Similar Jobs */}
          {similarJobs && similarJobs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {similarJobs.map((job: SimilarJob) => (
                    <div key={job.id} className="border-b pb-4 last:border-0">
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-sm text-gray-500">
                        {job.company.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{job.type}</Badge>
                        <Badge variant="outline">{job.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
