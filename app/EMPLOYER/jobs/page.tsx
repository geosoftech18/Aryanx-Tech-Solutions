"use client";

import { deleteJob, toggleJobStatus } from "@/actions/employer/create-job";
import { getJobsByCompany } from "@/actions/jobs/get-jobs-by-company";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Job, JobCategory, JobType } from "@prisma/client";
import { format } from "date-fns";
import { Edit, MoreVertical, Pause, Play, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/ui/alertModal";

type JobWithRelations = Job & {
  applications: { id: string }[];
  isActive: boolean;
};

export default function JobsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<JobCategory | "all">(
    "all"
  );
  const [typeFilter, setTypeFilter] = useState<JobType | "all">("all");
  const [jobs, setJobs] = useState<JobWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await getJobsByCompany();

        if (response.success && response.data) {
          setJobs(
            response.data.map((job) => ({
              ...job,
              isActive: job.isActive ?? true,
            }))
          );
        } else {
          toast.error(response.error || "Failed to fetch jobs");
          if (response.error === "No company found for this employer") {
            router.push("/EMPLOYER/company");
          }
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("An error occurred while fetching jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  const handleDelete = async (jobId: string) => {
    setJobIdToDelete(jobId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!jobIdToDelete) return;
    setDeleteLoading(true);
    try {
      const result = await deleteJob(jobIdToDelete);
      if (result.success) {
        setJobs(jobs.filter((job) => job.id !== jobIdToDelete));
        toast.success("Job deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete job");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      setJobIdToDelete(null);
    }
  };

  const handleToggleStatus = async (jobId: string, isActive: boolean) => {
    try {
      const result = await toggleJobStatus(jobId, !isActive);
      if (result.success) {
        setJobs(
          jobs.map((job) =>
            job.id === jobId ? { ...job, isActive: !isActive } : job
          )
        );
        toast.success(`Job ${isActive ? "paused" : "activated"} successfully`);
      } else {
        toast.error(result.error || "Failed to update job status");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || job.category === categoryFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Job Postings</h1>
        <Link href="/EMPLOYER/jobs/create">
          <Button>Create New Job</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={categoryFilter}
          onValueChange={(value: JobCategory | "all") =>
            setCategoryFilter(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.values(JobCategory).map((category) => (
              <SelectItem key={category} value={category}>
                {category.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={typeFilter}
          onValueChange={(value: JobType | "all") => setTypeFilter(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.values(JobType).map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {job.location}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/EMPLOYER/jobs/${job.id}`)
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleToggleStatus(job.id, job.isActive)}
                    >
                      {job.isActive ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{job.type}</Badge>
                <Badge variant="outline">{job.category}</Badge>
                {job.isFeatured && <Badge variant="default">Featured</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2">
                {job.description}
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium">
                  Applications: {job.applications.length}
                </p>
                <p className="text-sm text-gray-500">
                  Deadline: {format(new Date(job.deadline), "PPP")}
                </p>
                {job.salary && (
                  <p className="text-sm text-gray-500">
                    Salary: ${job.salary.toLocaleString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setJobIdToDelete(null);
        }}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
