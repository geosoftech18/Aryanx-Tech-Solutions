"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ApplicationStatus,
  Job,
  Candidate,
  User,
  Company,
  Education,
  WorkExperience,
  Certification,
} from "@prisma/client";
import {
  getApplicationDetails,
  updateApplicationStatus,
} from "@/actions/application/employer-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";

interface ApplicationDetails {
  id: string;
  status: ApplicationStatus;
  createdAt: Date;
  job: Job & {
    company: Company;
  };
  Candidate:
    | (Candidate & {
        user: User;
        education: Education[];
        WorkExperience: WorkExperience[];
        certifications: Certification[];
      })
    | null;
}
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export default function ApplicationDetailsPage({ params }: PageProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [application, setApplication] = useState<ApplicationDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      const { id } = await params;
      if (!session?.user?.id || !id) return;

      try {
        const data = await getApplicationDetails(id);
        setApplication(data);
      } catch (error) {
        console.error("Error fetching application:", error);
        toast.error("Failed to fetch application details");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [session?.user?.id, params]);

  const handleStatusUpdate = async (newStatus: ApplicationStatus) => {
    if (!application) return;

    setUpdating(true);
    try {
      await updateApplicationStatus(application.id, newStatus);
      setApplication({ ...application, status: newStatus });
      toast.success("Application status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update application status");
    } finally {
      setUpdating(false);
    }
  };

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

  if (!application) {
    return <div>Application not found</div>;
  }

  if (!application.Candidate) {
    return <div>Candidate information not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Application Details</h1>
        <div className="flex items-center gap-4">
          <Select
            value={application.status}
            onValueChange={(value) =>
              handleStatusUpdate(value as ApplicationStatus)
            }
            disabled={updating}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REVIEWED">Reviewed</SelectItem>
              <SelectItem value="INTERVIEW">Interview</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => router.back()}>
            Back to Applications
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Personal Details</h3>
                <p>
                  Name: {application.Candidate.user.firstname}{" "}
                  {application.Candidate.user.lastname}
                </p>
                <p>Email: {application.Candidate.user.email}</p>
                <p>Years of Experience: {application.Candidate.YOE}</p>
              </div>

              <div>
                <h3 className="font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {application.Candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Education</h3>
                {application.Candidate.education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p>
                      {edu.degree} - {edu.institution}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(edu.passout_year), "MMM yyyy")}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold">Work Experience</h3>
                {application.Candidate.WorkExperience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <p className="font-medium">
                      {exp.position} at {exp.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(exp.startDate), "MMM yyyy")} -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : format(new Date(exp.endDate), "MMM yyyy")}
                    </p>
                    <p className="text-sm mt-1">{exp.jobDescription}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold">Certifications</h3>
                {application.Candidate.certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p>
                      {cert.name} - {cert.company}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(cert.issueDate), "MMM yyyy")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{application.job.title}</h3>
                <p className="mt-2">{application.job.description}</p>
              </div>

              <div>
                <h3 className="font-semibold">Requirements</h3>
                <ul className="list-disc list-inside">
                  {application.job.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Applied on: {format(new Date(application.createdAt), "PPP")}
                </p>
                <Badge className={`mt-2 ${getStatusColor(application.status)}`}>
                  {application.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
