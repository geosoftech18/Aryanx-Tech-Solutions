import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import {
  Role,
  UserStatus,
  UserStatus as UserStatusType,
  type Role as RoleType,
} from "@prisma/client";
import Link from "next/link";

// Props for UsersHeader
interface UsersHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  role: RoleType | "all";
  onRoleChange: (value: Role | "all") => void;
  status: UserStatusType | "all";
  onStatusChange: (value: UserStatusType | "all") => void;
}

export function UsersHeader({
  search,
  onSearch,
  role,
  onRoleChange,
  status,
  onStatusChange,
}: UsersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Select value={role} onValueChange={onRoleChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value={Role.CANDIDATE}>{Role.CANDIDATE}</SelectItem>
            <SelectItem value={Role.EMPLOYER}>{Role.EMPLOYER}</SelectItem>
            <SelectItem value={Role.ADMIN}>{Role.ADMIN}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value={UserStatus.ACTIVE}>
              {UserStatus.ACTIVE}
            </SelectItem>
            <SelectItem value={UserStatus.INACTIVE}>
              {UserStatus.INACTIVE}
            </SelectItem>
            <SelectItem value={UserStatus.PENDING}>
              {UserStatus.PENDING}
            </SelectItem>
          </SelectContent>
        </Select>
        <Link href="/ADMIN/users/create" className="cursor-pointer">
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4 cursor-pointer" />
            Add User
          </Button>
        </Link>
      </div>
    </div>
  );
}
