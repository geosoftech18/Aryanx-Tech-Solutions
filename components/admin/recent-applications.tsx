import {
  listLatestApplications
} from "@/actions/admin/applications/list-latest-applications";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export async function RecentApplications() {
  const applications = await listLatestApplications(4);
  return (
    <Card className="light-card col-span-1">
      <CardHeader>
        <CardTitle className="text-gray-900">Recent Applications</CardTitle>
        <CardDescription className="text-gray-600">
          Latest job applications received
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="flex items-center gap-4 p-2 rounded-md light-table-row-hover"
            >
              <Avatar className="h-8 w-8 border border-gray-200">
                {/* <AvatarImage
                  src={application.avatar || "/placeholder.svg"}
                  alt={application.name}
                /> */}
                <AvatarFallback className="bg-gray-100 text-gray-700">
                  {application.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-gray-900">
                  {application.name}
                </p>
                <p className="text-xs text-gray-600">
                  {application.position} at {application.company}
                </p>
                <p className="text-xs text-gray-500">{application.date}</p>
              </div>
              <Badge
                variant={
                  application.status === "approved"
                    ? "default"
                    : application.status === "pending"
                    ? "outline"
                    : application.status === "reviewing"
                    ? "secondary"
                    : "destructive"
                }
                className={
                  application.status === "approved"
                    ? "light-badge-success"
                    : application.status === "pending"
                    ? "border-gray-300 text-gray-700"
                    : application.status === "reviewing"
                    ? "light-badge-info"
                    : "light-badge-danger"
                }
              >
                {application.status.charAt(0).toUpperCase() +
                  application.status.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
        <Link href="/ADMIN/applications" className="cursor-pointer">
          <Button
            variant="outline"
            className="mt-4 w-full border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            View All Applications
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
