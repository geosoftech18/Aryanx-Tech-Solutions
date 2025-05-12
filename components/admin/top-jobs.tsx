import { listTopJobs } from "@/actions/admin/jobs/list-top-jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export async function TopJobs() {
  const jobs = await listTopJobs(5);

  return (
    <Card className="light-card col-span-1">
      <CardHeader>
        <CardTitle className="text-gray-900">Top Jobs</CardTitle>
        <CardDescription className="text-gray-600">
          Most popular job listings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="space-y-2 p-2 rounded-md light-table-row-hover"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{job.title}</h3>
                <Badge
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                >
                  {job.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-gray-600">
                  {job.company.name} • {job.location}
                </p>
                <p className="text-gray-600">
                  {job.applications.length} applications
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Posted {job.createdAt.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        <Link href="/ADMIN/jobs" className="cursor-pointer">
          <Button
            variant="outline"
            className="mt-4 w-full border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            View All Jobs
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
