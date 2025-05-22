import { AnalyticsHeader } from "@/components/admin/analytics/analytics-header"
import { AnalyticsCharts } from "@/components/admin/analytics/analytics-charts"
import { AnalyticsStats } from "@/components/admin/analytics/analytics-stats"
import { TopPerformers } from "@/components/admin/analytics/top-performers"

import { getAdminStatsTrends } from "@/actions/admin/analytics/get-admin-stats-trends"
import { getAdminAnalyticsCharts } from "@/actions/admin/analytics/get-admin-analytics-charts"
import { getAdminTopPerformers } from "@/actions/admin/analytics/get-admin-top-performers"

// Admin analytics page: fetches all analytics data and passes to UI components
export default async function AnalyticsPage() {
  // Fetch all analytics data in parallel for performance
  const [stats, charts, topPerformers] = await Promise.all([
    getAdminStatsTrends(),
    getAdminAnalyticsCharts(),
    getAdminTopPerformers(),
  ])

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader />
      <AnalyticsStats stats={stats} />
      <AnalyticsCharts charts={charts} />
      <TopPerformers data={topPerformers} />
    </div>
  )
}
