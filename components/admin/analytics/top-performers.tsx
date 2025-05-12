import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AdminTopPerformers } from "@/actions/admin/analytics/get-admin-top-performers"

interface TopPerformersProps {
  data: AdminTopPerformers
}

export function TopPerformers({ data }: TopPerformersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
        <CardDescription>View the best performing jobs and companies</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="jobs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="jobs">Top Jobs</TabsTrigger>
            <TabsTrigger value="companies">Top Companies</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs" className="space-y-4">
            {data.topJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium leading-none">{job.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.company} • {job.location}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{job.applications}</p>
                    <p className="text-xs text-muted-foreground">Applications</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{job.conversionRate}</p>
                    <p className="text-xs text-muted-foreground">Conversion</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="companies" className="space-y-4">
            {data.topCompanies.map((company) => (
              <div key={company.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{company.name}</p>
                    <p className="text-sm text-muted-foreground">{company.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{company.jobs}</p>
                    <p className="text-xs text-muted-foreground">Jobs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{company.applications}</p>
                    <p className="text-xs text-muted-foreground">Applications</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{company.hireRate}</p>
                    <p className="text-xs text-muted-foreground">Hire Rate</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
