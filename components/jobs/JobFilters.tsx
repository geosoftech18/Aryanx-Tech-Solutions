"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobCategory, EmploymentType , WorkMode } from "@prisma/client";

interface JobFiltersProps {
  selectedType?: EmploymentType | undefined;
  selectedCategory?: JobCategory | undefined;
  selectedWorkMode?: WorkMode | undefined;
}

export default function JobFilters({
  selectedType,
  selectedCategory,
  selectedWorkMode,
}: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Job Type</h3>
        <Select
          value={selectedType || "All"}
          onValueChange={(value) => updateFilter("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {Object.values(EmploymentType).map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Work Mode</h3>
        <Select
          value={selectedWorkMode || "All"}
          onValueChange={(value) => updateFilter("workMode", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select work mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {Object.values(WorkMode).map((mode) => (
              <SelectItem key={mode} value={mode}>
                {mode.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <Select
          value={selectedCategory || "All"}
          onValueChange={(value) => updateFilter("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {Object.values(JobCategory).map((category) => (
              <SelectItem key={category} value={category}>
                {category.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.push("/jobs")}
      >
        Clear Filters
      </Button>
    </div>
  );
} 