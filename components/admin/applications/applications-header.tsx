import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationStatus } from "@prisma/client";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

// Add prop for search and status
export interface ApplicationsHeaderProps {
  search: string;
  status: ApplicationStatus | "";
  onSearch: (value: string) => void;
  onStatusChange: (value: ApplicationStatus | "") => void;
}

export function ApplicationsHeader({
  search,
  status,
  onSearch,
  onStatusChange,
}: ApplicationsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold tracking-tight">
        Applications Management
      </h1>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ApplicationStatus.PENDING}>Pending</SelectItem>
            <SelectItem value={ApplicationStatus.REVIEWED}>Reviewed</SelectItem>
            <SelectItem value={ApplicationStatus.INTERVIEW}>
              Interview
            </SelectItem>
            <SelectItem value={ApplicationStatus.REJECTED}>Rejected</SelectItem>
            <SelectItem value={ApplicationStatus.ACCEPTED}>Accepted</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Link href="/admin/applications/create" className="cursor-pointer">
        <Button className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4 cursor-pointer" />
          Add Application
        </Button>
      </Link>
    </div>
  );
}
