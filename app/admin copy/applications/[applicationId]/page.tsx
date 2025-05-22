import { getApplicationDetails } from "@/actions/admin/applications/get-application-details";
import ApplicationForm from "@/components/admin/applications/ApplicationForm";

interface PageProps {
  params: Promise<{
    applicationId: string | null;
  }>;
}

export default async function ApplicationModePage({ params }: PageProps) {
  const { applicationId } = await params;

  if (applicationId === "create" || applicationId === null) {
    // Placeholder for ApplicationForm (create/edit)
    return <ApplicationForm initialData={null} applicationId={null} />;
  }

  const application = await getApplicationDetails(applicationId);

  if (!application) {
    return <div>Application not found.</div>;
  }

  // Render the view modal for now (could be a form for edit in the future)
  const initialData = {
    candidateId: application.candidateId || "",
    jobId: application.jobId || "",
    coverLetter: application.coverLetter || "",
  };
  return (
    <ApplicationForm initialData={initialData} applicationId={applicationId} />
    // <ApplicationViewModal FullApplication={application} open={true} onClose={() => {}} />
  );
} 