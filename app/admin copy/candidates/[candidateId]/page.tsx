import { getCandidateDetails } from "@/actions/admin/candidates/get-candidate-details";
import CandidateForm from "@/components/admin/candidates/CandidateForm";

interface PageProps {
  params: Promise<{
    candidateId: string | null;
  }>;
}

export default async function CandidateModePage({ params }: PageProps) {
  const { candidateId } = await params;

  if (candidateId === "create" || candidateId === null) {
    // Placeholder for ApplicationForm (create/edit)
    return <CandidateForm initialData={null} candidateId={null} />;
  }

  const candidate = await getCandidateDetails(candidateId);

  if (!candidate) {
    return <div>Candidate not found.</div>;
  }

  
  return (
    <CandidateForm
      candidateId={candidateId}
      initialData={{
        ...candidate,
        resume: candidate.resume ?? undefined,
        LGBTQ: candidate.LGBTQ ?? undefined,
        pwdCategory: candidate.pwdCategory ?? undefined,
        employmentBreak: candidate.employmentBreak ?? undefined,
        user: { connect: { id: candidate.userId } },
      }}
    />
  );
} 