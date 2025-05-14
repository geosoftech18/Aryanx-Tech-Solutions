"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Industry, Sector } from "@prisma/client";
import { Briefcase, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  initialSalaryMin?: string;
  initialSalaryMax?: string;
  initialIndustry?: Industry;
  initialSector?: Sector;
}

const salaryRanges = [
  { value: "0", label: "0" },
  { value: "300000", label: "3L" },
  { value: "500000", label: "5L" },
  { value: "700000", label: "7L" },
  { value: "1000000", label: "10L" },
  { value: "1500000", label: "15L" },
  { value: "2000000", label: "20L" },
  { value: "2500000", label: "25L" },
  { value: "3000000", label: "30L+" },
];

// Helper function to format enum values for display
const formatEnumValue = (value: string) => {
  return value
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

export default function SearchBar({ 
  initialQuery = "", 
  initialLocation = "",
  initialSalaryMin,
  initialSalaryMax,
  initialIndustry,
  initialSector
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [salaryMin, setSalaryMin] = useState(initialSalaryMin?.toString() || "");
  const [salaryMax, setSalaryMax] = useState(initialSalaryMax?.toString() || "");
  const [industry, setIndustry] = useState<Industry | "All">(initialIndustry || "All");
  const [sector, setSector] = useState<Sector | "All">(initialSector || "All");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    if (salaryMin) params.set("salaryMin", salaryMin);
    if (salaryMax) params.set("salaryMax", salaryMax);
    if (industry && industry !== "All") params.set("industry", industry);
    if (sector && sector !== "All") params.set("sector", sector);
    
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <form onSubmit={handleSearch} className="flex flex-col gap-6">
        {/* First Row - Main Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Briefcase className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="text"
              placeholder="Job title or keywords"
              className="pl-12 h-14 w-full text-lg font-medium rounded-lg border-2 border-gray-200 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 relative w-full">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <MapPin className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="text"
              placeholder="City or location"
              className="pl-12 h-14 w-full text-lg font-medium rounded-lg border-2 border-gray-200 focus:border-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors min-w-[160px]"
          >
            Search Jobs
          </Button>
        </div>

        {/* Second Row - Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={salaryMin} onValueChange={setSalaryMin}>
            <SelectTrigger className="h-12 text-base font-medium border-2 border-gray-200">
              <SelectValue placeholder="Minimum salary" />
            </SelectTrigger>
            <SelectContent>
              {salaryRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  ₹{range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={salaryMax} onValueChange={setSalaryMax}>
            <SelectTrigger className="h-12 text-base font-medium border-2 border-gray-200">
              <SelectValue placeholder="Maximum salary" />
            </SelectTrigger>
            <SelectContent>
              {salaryRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  ₹{range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={industry} onValueChange={(value) => setIndustry(value as Industry | "All")}>
            <SelectTrigger className="h-12 text-base font-medium border-2 border-gray-200">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {Object.values(Industry).map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {formatEnumValue(ind)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sector} onValueChange={(value) => setSector(value as Sector | "All")}>
            <SelectTrigger className="h-12 text-base font-medium border-2 border-gray-200">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {Object.values(Sector).map((sec) => (
                <SelectItem key={sec} value={sec}>
                  {formatEnumValue(sec)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
} 