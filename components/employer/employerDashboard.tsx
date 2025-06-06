import { getAnalytics } from "@/actions/employer/get-analytics";
import { getCompany } from "@/actions/employer/get-company";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  ApplicationStatus
} from "@prisma/client";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  FileText,
  PieChart,
  TrendingUp,
  Users,
  Settings,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { NotificationDropdown } from "../ui/notification-dropdown";

// Types for analytics data
// type AnalyticsData = {
//   totalJobs: number;
//   activeJobs: number;
//   totalApplications: number;
//   newApplications: number;
//   scheduledInterviews: number;
//   hiresMade: number;
//   applicationsByStatus: Record<ApplicationStatus, number>;
//   recentApplications: (Application & {
//     job: {
//       id: string;
//       title: string;
//     };
//   })[];
//   jobCategories: { category: JobCategory; count: number }[];
//   averageSalary: number;
// };

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//     },
//   },
// };

export default async function EmployerDashboard() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  const [companyData, analyticsData] = await Promise.all([
    getCompany(),
    getAnalytics(),
  ]);

  const company = companyData.company;
  const analytics = analyticsData;
 
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {company?.name}
              </h1>
              <p className="text-white/80 mt-2">
                Here&lsquo;s your hiring dashboard overview
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/employer/jobs"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Briefcase className="h-4 w-4" />
                <span>Jobs</span>
              </Link>
              <Link
                href="/employer/applications"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Applications</span>
              </Link>
              <Link
                href="/employer/company"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Building2 className="h-4 w-4" />
                <span>Company Profile</span>
              </Link>
              {session?.user?.id && (
                <NotificationDropdown
                  userId={session.user.id}
                  userRole="EMPLOYER"
                />
              )}
              <Link
                href="/employer/settings"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 mt-4">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Jobs Card */}
          <div>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Jobs
                </CardTitle>
                <Briefcase className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {analytics?.activeJobs}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {analytics?.totalJobs} total jobs posted
                </p>
                <div className="flex items-center mt-2 text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>12% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Applications Card */}
          <div>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  New Applications
                </CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {analytics?.newApplications}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {analytics?.totalApplications} total applications
                </p>
                <div className="flex items-center mt-2 text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>8% from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Interviews Card */}
          <div>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Scheduled Interviews
                </CardTitle>
                <Calendar className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {analytics?.scheduledInterviews}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Interviews this week
                </p>
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>3% from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hires Made Card */}
          <div>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Hires Made
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {analytics?.hiresMade}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Successful hires this month
                </p>
                <div className="flex items-center mt-2 text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>15% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Applications and Job Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Recent Applications */}
          <div>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Recent Applications
                  </CardTitle>
                  <BarChart2 className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {analytics?.recentApplications.map((application) => (
                    <div
                      key={application.id}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {application.job.title}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span
                              className={cn(
                                "px-2 py-1 text-xs rounded-full",
                                application.status ===
                                  ApplicationStatus.PENDING &&
                                  "bg-yellow-100 text-yellow-800",
                                application.status ===
                                  ApplicationStatus.REVIEWED &&
                                  "bg-blue-100 text-blue-800",
                                application.status ===
                                  ApplicationStatus.INTERVIEW &&
                                  "bg-green-100 text-green-800",
                                application.status ===
                                  ApplicationStatus.REJECTED &&
                                  "bg-red-100 text-red-800",
                                application.status ===
                                  ApplicationStatus.ACCEPTED &&
                                  "bg-purple-100 text-purple-800"
                              )}
                            >
                              {application.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Categories */}
          <div>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Job Categories
                  </CardTitle>
                  <PieChart className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {analytics?.jobCategories.map((category) => (
                    <div
                      key={category.category}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {category.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {category.count} jobs
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Application Status Chart */}
        <div className="mt-6">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Applications by Status
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(analytics?.applicationsByStatus || {}).map(
                  ([status, count]) => (
                    <div
                      key={status}
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium text-gray-600">
                        {status}
                      </span>
                      <span className="text-2xl font-bold text-gray-900 mt-2">
                        {count}
                      </span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
