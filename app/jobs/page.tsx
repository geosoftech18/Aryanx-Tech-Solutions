import { getJobs } from "@/actions/jobs/get-jobs";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import SearchBar from "@/components/jobs/SearchBar";
import { Button } from "@/components/ui/button";
import { Industry, JobCategory, JobType, Sector } from "@prisma/client";
import Link from "next/link";

interface JobsPageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    salaryMin?: string;
    salaryMax?: string;
    type?: string;
    category?: string;
    industry?: string;
    sector?: string;
  }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  // const params = {
  //   q: searchParams.q ?? "",
  //   location: searchParams.location ?? "",
  //   salaryMin: searchParams.salaryMin ? parseInt(searchParams.salaryMin) : undefined,
  //   salaryMax: searchParams.salaryMax ? parseInt(searchParams.salaryMax) : undefined,
  //   type: searchParams.type as JobType | undefined,
  //   category: searchParams.category as JobCategory | undefined,
  //   industry: searchParams.industry as Industry ?? undefined,
  //   sector: searchParams.sector as Sector?? undefined,
  // };

  const sparams = await searchParams;

  const params = {
    q: sparams.q ?? "",
    location: sparams.location ?? "",
    salaryMin: sparams.salaryMin ? parseInt(sparams.salaryMin) : undefined,
    salaryMax: sparams.salaryMax ? parseInt(sparams.salaryMax) : undefined,
    type: sparams.type as JobType | undefined,
    category: sparams.category as JobCategory | undefined,
    industry: (sparams.industry as Industry) ?? undefined,
    sector: (sparams.sector as Sector) ?? undefined,
  };

  const jobs = await getJobs(params);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SearchBar
            initialQuery={params.q}
            initialLocation={params.location}
            initialSalaryMin={params.salaryMin}
            initialSalaryMax={params.salaryMax}
            initialIndustry={params.industry}
            initialSector={params.sector}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters
              selectedType={params.type as JobType}
              selectedCategory={params.category as JobCategory}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {jobs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all jobs
                </p>
                <Link href="/jobs">
                  <Button variant="outline" asChild>
                    View All Jobs
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
