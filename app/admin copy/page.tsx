import { DashboardHeader } from "@/components/admin/dashboard-header"
import DashboardStats from "@/components/admin/dashboard-stats"
import { RecentApplications } from "@/components/admin/recent-applications"
import { TopJobs } from "@/components/admin/top-jobs"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentApplications />
        <TopJobs />
      </div>
    </div>
  )
}
