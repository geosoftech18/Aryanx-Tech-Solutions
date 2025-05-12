import { ArrowDown, ArrowUp, Briefcase, FileText, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AdminStatsTrends } from "@/actions/admin/analytics/get-admin-stats-trends"

interface AnalyticsStatsProps {
  stats: AdminStatsTrends
}

export function AnalyticsStats({  }: AnalyticsStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 flex items-center">
              <ArrowUp className="mr-1 h-4 w-4" />
              12% from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Jobs</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+284</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 flex items-center">
              <ArrowUp className="mr-1 h-4 w-4" />
              8% from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Applications</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+1,429</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 flex items-center">
              <ArrowUp className="mr-1 h-4 w-4" />
              15% from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18.2%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-600 flex items-center">
              <ArrowDown className="mr-1 h-4 w-4" />
              3% from last month
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
