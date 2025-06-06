import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export interface CandidatesHeaderProps {
  search: string;
  onSearch: (value: string) => void;
}

export function CandidatesHeader({ search, onSearch }: CandidatesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold tracking-tight">Candidates Management</h1>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search candidates..."
            className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Link href="/admin/candidates/create" className="cursor-pointer">
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4 cursor-pointer" />
            Add Candidate
          </Button>
        </Link>
      </div>
    </div>
  );
} 