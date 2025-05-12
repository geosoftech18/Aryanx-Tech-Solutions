import { ArrowDown, ArrowUp, Briefcase, Building2, FileText, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/actions/admin/analytics/get-dashboard-stats"

export default async function DashboardStats() {
  const stats = await getDashboardStats()
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="light-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Total Jobs</CardTitle>
          <Briefcase className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.jobs}</div>
          <p className="text-xs text-gray-500">
            <span className="text-green-600 flex items-center">
              <ArrowUp className="mr-1 h-4 w-4" />
              0% from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card className="light-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Applications</CardTitle>
          <FileText className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.applications}</div>
          <p className="text-xs text-gray-500">
            <span className="text-green-600 flex items-center">
              <ArrowUp className="mr-1 h-4 w-4" />
              0% from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card className="light-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Users</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.users}</div>
          <p className="text-xs text-gray-500">
            <span className="text-green-600 flex items-center">
              <ArrowUp className="mr-1 h-4 w-4" />
              0% from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card className="light-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Companies</CardTitle>
          <Building2 className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.companies}</div>
          <p className="text-xs text-gray-500">
            <span className="text-red-600 flex items-center">
              <ArrowDown className="mr-1 h-4 w-4" />
              0% from last month
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
