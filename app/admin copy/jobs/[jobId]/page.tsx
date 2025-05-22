import { getJobDetails } from "@/actions/jobs/get-job-details";
import JobForm from "./components/job-form";

interface PageProps {
  params: Promise<{
    jobId: string | null;
  }>;
}

export default async function JobModePage({ params }: PageProps) {
  const { jobId } = await params;

  if (jobId === "create" || jobId === null) {
    return <JobForm jobId={null} initialData={null} />;
  }

  const job = await getJobDetails(jobId);

  return <JobForm jobId={jobId} initialData={job} />;
}
