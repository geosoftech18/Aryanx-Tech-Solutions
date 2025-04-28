

import { getCompany } from "@/actions/employer/get-company";
import { getJobDetails } from "@/actions/jobs/get-job-details";
import JobForm from "./components/job-form";

interface PageProps {
    params: Promise<{
      jobId: string|null;
    }>;
  }


export default async function JobModePage({params}:PageProps) {
  const {jobId} = await params;
  const {company} = await getCompany()
  console.log(company)

  if(jobId === "create" || jobId === null){
    return <JobForm jobId={null} initialData={null} companyId={company.id} />
  }

  const job = await getJobDetails(jobId);

  return (
      <JobForm jobId={jobId} initialData={job} companyId={company.id} />
  );
}
