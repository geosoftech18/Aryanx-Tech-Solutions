import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotificationDropdown } from "@/components/ui/notification-dropdown";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import {
  type Application,
  ApplicationStatus,
  type Company,
  type Job,
} from "@prisma/client";
import {
  BarChart3,
  BriefcaseIcon,
  Calendar,
  ChevronRight,
  Search,
  Settings,
  Sparkles,
  User
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import type React from "react";
import ApplicationDetailsModal from "./application-details-modal";

interface CandidateDashboardProps {
  applications: (Application & Job & Company)[];
  userName: string;
  jobRecommendations: (Job & { company: Company })[];
}

// const ApplicationDetailsModal = dynamic(() => import("./application-details-modal"), { ssr: false });

const CandidateDashboard: React.FC<CandidateDashboardProps> = async ({
  applications,
  userName,
  jobRecommendations,
}) => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) {
    return <div>unauthenticated!</div>;
  }

  // Calculate application statistics
  const totalApplications = applications.length;
  const interviewCount = applications.filter(
    (app) => app.status === ApplicationStatus.INTERVIEW
  ).length;
  const acceptedCount = applications.filter(
    (app) => app.status === ApplicationStatus.ACCEPTED
  ).length;
  const rejectedCount = applications.filter(
    (app) => app.status === ApplicationStatus.REJECTED
  ).length;
  const pendingCount =
    totalApplications - interviewCount - acceptedCount - rejectedCount;

  // // Get the most recent application
  // const sortedApplications = [...applications].sort(
  //   (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // );

  // console.log(jobRecommendations);

  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-background to-background/80">
      {/* Header with notifications and settings */}
      <div className="flex justify-end mb-6 gap-2">
        {session?.user?.id && (
          <NotificationDropdown userId={session.user.id} userRole="CANDIDATE" />
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={"/CANDIDATE/profile"}>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Welcome Section with improved layout */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
              <AvatarImage src="/vibrant-street-market.png" alt={userName} />
              <AvatarFallback className="text-xl bg-primary/10 text-primary">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {userName}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Let&apos;s continue your job search journey
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Link href={"/jobs"} className="flex-1 md:flex-none cursor-pointer">
            <Button size="lg" className="w-full shadow-sm cursor-pointer">
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards Section */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400 flex items-center">
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{totalApplications}</div>
                <div className="text-xs px-2 py-1 bg-blue-200/50 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 rounded-full">
                  {pendingCount} pending
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{interviewCount}</div>
                <div className="text-xs px-2 py-1 bg-green-200/50 dark:bg-green-800/50 text-green-700 dark:text-green-300 rounded-full">
                  {acceptedCount} offers
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400 flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">
                  {totalApplications
                    ? Math.round((interviewCount / totalApplications) * 100)
                    : 0}
                  %
                </div>
                <div className="text-xs px-2 py-1 bg-amber-200/50 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300 rounded-full">
                  Interview rate
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={100} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="font-medium">{100}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        {/* <Card className="lg:row-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Recent Activity
              </span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-4">
              {sortedApplications.slice(0, 3).map((app, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 bg-muted rounded-full p-1.5">
                    <BriefcaseIcon className="h-3 w-3" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Applied for {app.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View all activity
            </Button>
          </CardFooter>
        </Card> */}
      </div>

      <ApplicationDetailsModal applications={applications} />

      {/* Job Recommendations with improved cards */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center">
              Recommended for You
              <Sparkles className="h-5 w-5 ml-2 text-amber-500" />
            </h2>
            <p className="text-muted-foreground">
              Personalized job matches based on your profile
            </p>
          </div>
          <Link className="cursor-pointer" href={"/jobs"}>
            <Button variant="outline" className="cursor-pointer" size="sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobRecommendations.map((job) => (
            <Card
              key={job.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-md group"
            >
              <CardHeader className="p-4 pb-0 flex flex-row items-start gap-3">
                <Avatar className="h-10 w-10 rounded-md">
                  <AvatarImage
                    src={job.company.logo || "/placeholder.svg"}
                    alt={job.company.name}
                  />
                  <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                    {job.company.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-base font-semibold leading-tight group-hover:text-primary transition-colors">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {job.company.name}
                  </CardDescription>
                </div>
                {/* You can add a match percentage or badge here if needed */}
              </CardHeader>
              <CardContent className="p-4 pt-3">
                <div className="text-sm text-muted-foreground space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-pin"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-banknote"
                      >
                        <rect width="20" height="12" x="2" y="6" rx="2" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M6 12h.01M18 12h.01" />
                      </svg>
                    </div>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {job.salary ? `$${job.salary}` : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <span>
                      Posted{" "}
                      {Math.max(
                        0,
                        Math.floor(
                          (Date.now() - new Date(job.createdAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      )}{" "}
                      days ago
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Link
                  className="w-full cursor-pointer"
                  href={`/jobs/${job.id}`}
                >
                  <Button className="w-full cursor-pointer" variant="default">
                    Apply Now
                  </Button>
                </Link>
                {/* save button */}
                {/* <Button variant="outline" size="icon" className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bookmark"
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions with improved design */}
      <Card className="bg-gradient-to-r from-muted/50 to-background border">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <CardDescription>
            Boost your job search with these tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionCard
              icon={<User className="h-5 w-5" />}
              title="Update Profile"
              description="Enhance your visibility to recruiters"
              href="/CANDIDATE/profile"
            />
            {/* <QuickActionCard
              icon={<Search className="h-5 w-5" />}
              title="Job Alerts"
              description="Set up personalized job alerts"
              href="/"
            />
            <QuickActionCard
              icon={<HelpCircle className="h-5 w-5" />}
              title="Career Resources"
              description="Access interview tips and guides"
              href="#"
            /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Application Card Component

// Quick Action Card Component
interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  description,
  href,
}) => {
  const content = (
    <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors h-full">
      <div className="rounded-full bg-primary/10 p-3 mb-3">{icon}</div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="h-full">
        {content}
      </Link>
    );
  }

  return content;
};

export default CandidateDashboard;
