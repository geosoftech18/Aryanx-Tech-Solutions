import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BriefcaseIcon,
  FileText,
  Search,
  Upload,
  User
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { Application, ApplicationStatus, Company, Job } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface CandidateDashboardProps {
  applications: (Company & Job & Application)[];
  userName: string;
}

const CandidateDashboard: React.FC<CandidateDashboardProps> = ({
  applications,
  userName,
}) => {
  const jobRecommendations = [
    {
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
    },
    {
      title: "Frontend Team Lead",
      company: "InnoTech Solutions",
      location: "Remote",
      salary: "$130k - $160k",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Minds",
      location: "New York, NY",
      salary: "$115k - $140k",
    },
  ];

  // const applications = [
  //   {
  //     id: "1",
  //     title: "Senior React Developer",
  //     company: "TechCorp Inc.",
  //     location: "San Francisco, CA",
  //     appliedDate: "2024-04-15",
  //     lastUpdate: "2024-04-20",
  //     status: "Interview Scheduled",
  //     statusColor: "green",
  //   },
  //   {
  //     id: "2",
  //     title: "Frontend Engineer",
  //     company: "Innovate Solutions",
  //     location: "Remote",
  //     appliedDate: "2024-04-10",
  //     lastUpdate: "2024-04-18",
  //     status: "Under Review",
  //     statusColor: "yellow",
  //   },
  //   {
  //     id: "3",
  //     title: "Full Stack Developer",
  //     company: "Digital Dynamics",
  //     location: "New York, NY",
  //     appliedDate: "2024-04-05",
  //     lastUpdate: "2024-04-12",
  //     status: "Rejected",
  //     statusColor: "red",
  //   },
  //   {
  //     id: "4",
  //     title: "UI/UX Developer",
  //     company: "Creative Tech",
  //     location: "Boston, MA",
  //     appliedDate: "2024-04-01",
  //     lastUpdate: "2024-04-22",
  //     status: "Offer Received",
  //     statusColor: "green",
  //   }
  // ];

  const session = getServerSession(NEXT_AUTH_CONFIG);

  if (!session) {
    return <div>unauthenticated!</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Welcome Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" alt={userName} />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
            <p className="text-gray-500">
              Let&lsquo;s continue your job search journey
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
          <Link href={"/"} className="cursor-pointer">
            <Button size="lg" className="cursor-pointer">
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{applications.length}</div>
              <BriefcaseIcon className="h-5 w-5 text-blue-500" />
            </div>
            {/* <p className="text-xs text-blue-600 mt-1">2 pending responses</p> */}
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {applications.reduce((count, item) => {
                  return item.status === ApplicationStatus.INTERVIEW
                    ? count + 1
                    : count;
                }, 0)}
              </div>
              <FileText className="h-5 w-5 text-green-500" />
            </div>
            {/* <p className="text-xs text-green-600 mt-1">
              Next: Tomorrow, 2:00 PM
            </p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={100} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{100}%</span>
              </div>
            </div>
            <Link
              href="/profile"
              className="inline-flex items-center mt-2 text-xs text-blue-600 hover:underline"
            >
              <User className="mr-1 h-3 w-3" />
              Complete your profile
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* My Applications Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5" />
            My Applications
          </CardTitle>
          <CardDescription>
            Track your job applications and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((application) => (
              <Card
                key={application.id}
                className="hover:bg-accent/5 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">
                        {application.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {application.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {application.location}
                      </p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-sm flex items-center gap-1 text-muted-foreground">
                          <FileText className="h-4 w-4" /> Applied:{" "}
                          {application.createdAt.toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {/* <span className="text-sm flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" /> Updated:{" "}
                          {application.updatedAt.toISOString()}
                        </span> */}
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end gap-2">
                      <Badge
                        variant={
                          application.status === ApplicationStatus.REJECTED
                            ? "destructive"
                            : application.status ===
                                ApplicationStatus.ACCEPTED ||
                              application.status === ApplicationStatus.INTERVIEW
                            ? "default"
                            : "secondary"
                        }
                        className="whitespace-nowrap"
                      >
                        {application.status}
                      </Badge>
                      <div className="flex gap-2">
                        {/* <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Withdraw
                        </Button> */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Recommendations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recommended Jobs</CardTitle>
          <CardDescription>
            Based on your profile and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobRecommendations.map((job, index) => (
              <Card
                key={index}
                className="hover:border-blue-200 transition-colors cursor-pointer"
              >
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-1">{job.title}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>{job.company}</p>
                    <p>{job.location}</p>
                    <p className="text-green-600 font-medium">{job.salary}</p>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with these common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center"
            >
              <Upload className="h-6 w-6 mb-2" />
              <span>Upload New Resume</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center"
            >
              <User className="h-6 w-6 mb-2" />
              <span>Update Profile</span>
            </Button>
            <Link
              href={"/"}
              className="h-auto py-4 flex flex-col items-center cursor-pointer"
            >
              <Button
                variant="outline"
                className="h-full w-full cursor-pointer"
              >
                <Search className="h-6 w-6 mb-2" />
                <span>Browse Jobs</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateDashboard;
