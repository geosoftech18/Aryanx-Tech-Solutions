"use client";

import { getCompanyApplications } from "@/actions/application/employer-actions";
import { getJobsByCompany } from "@/actions/jobs/get-jobs-by-company";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicationStatus, Candidate, Certification, Education, Job, User, WorkExperience } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Application {
  id: string;
  status: ApplicationStatus;
  createdAt: Date;
  job: Job;
  Candidate: (Candidate & {
    user: User;
    education: Education[];
    WorkExperience: WorkExperience[];
    certifications: Certification[];
  }) | null;
}

interface JobWithApplications extends Job {
  applications: { id: string }[];
}

export default function ApplicationsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<JobWithApplications[]>([]);
  const [status, setStatus] = useState<ApplicationStatus | "ALL">("ALL");
  const [selectedJobId, setSelectedJobId] = useState<string | "ALL">("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;
      
      try {
        // Fetch jobs first
        const jobsResponse = await getJobsByCompany();
        if (jobsResponse.success && jobsResponse.data) {
          setJobs(jobsResponse.data);
        }

        // Then fetch applications
        const data = await getCompanyApplications({
          userId: session.user.id,
          status: status === "ALL" ? undefined : status,
          jobId: selectedJobId === "ALL" ? undefined : selectedJobId,
        });
        setApplications(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user?.id, status, selectedJobId]);

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "REVIEWED":
        return "bg-blue-500";
      case "INTERVIEW":
        return "bg-purple-500";
      case "ACCEPTED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <div className="flex gap-4">
          <Select
            value={selectedJobId}
            onValueChange={(value) => setSelectedJobId(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Jobs</SelectItem>
              {jobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as ApplicationStatus | "ALL")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Applications</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REVIEWED">Reviewed</SelectItem>
              <SelectItem value="INTERVIEW">Interview</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {applications.map((application) => (
          <Card
            key={application.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/EMPLOYER/applications/${application.id}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>
                  {application.Candidate?.user.firstname} {application.Candidate?.user.lastname}
                </CardTitle>
                <Badge className={getStatusColor(application.status)}>
                  {application.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Applied for: {application.job.title}
                </p>
                <p className="text-sm text-gray-500">
                  Email: {application.Candidate?.user.email}
                </p>
                <p className="text-sm text-gray-500">
                  Experience: {application.Candidate?.YOE} years
                </p>
                <div className="flex flex-wrap gap-2">
                  {application.Candidate?.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Applied on: {format(new Date(application.createdAt), "PPP")}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
