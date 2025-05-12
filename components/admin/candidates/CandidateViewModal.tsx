import { Modal } from "@/components/ui/modal";
import { CandidateWithUser } from "@/actions/admin/candidates/list-candidates";

interface CandidateViewModalProps {
  candidate: CandidateWithUser | null;
  open: boolean;
  onClose: () => void;
}

/**
 * CandidateViewModal: shows candidate and user details in a modal
 */
export default function CandidateViewModal({ candidate, open, onClose }: CandidateViewModalProps) {
  if (!candidate) return null;
  return (
    <Modal
      title="Candidate Details"
      description={`Details for candidate: ${candidate.user.firstname} ${candidate.user.lastname}`}
      isOpen={open}
      onClose={onClose}
    >
      <div className="space-y-2 text-sm">
        <div><span className="font-semibold">Name:</span> {candidate.user.firstname} {candidate.user.lastname}</div>
        <div><span className="font-semibold">Email:</span> {candidate.user.email}</div>
        <div><span className="font-semibold">Candidate Type:</span> {candidate.candidateType}</div>
        <div><span className="font-semibold">Gender:</span> {candidate.gender}</div>
        <div><span className="font-semibold">YOE:</span> {candidate.YOE}</div>
        <div><span className="font-semibold">Skills:</span> {candidate.skills?.join(", ") ?? "N/A"}</div>
        <div><span className="font-semibold">Bio:</span> {candidate.Bio ?? "N/A"}</div>
        <div><span className="font-semibold">DOB:</span> {candidate.DOB ? new Date(candidate.DOB).toLocaleDateString() : "N/A"}</div>
        <div><span className="font-semibold">Resume:</span> {candidate.resume ?? "N/A"}</div>
        <div><span className="font-semibold">LGBTQ:</span> {candidate.LGBTQ ?? "N/A"}</div>
        <div><span className="font-semibold">PWD Category:</span> {candidate.pwdCategory ?? "N/A"}</div>
        <div><span className="font-semibold">Employment Break:</span> {candidate.employmentBreak ?? "N/A"}</div>
        <div className="mt-2 font-semibold">Created At:</div>
        <div>{candidate.createdAt ? new Date(candidate.createdAt).toLocaleString() : "N/A"}</div>
        <div className="font-semibold">Updated At:</div>
        <div>{candidate.updatedAt ? new Date(candidate.updatedAt).toLocaleString() : "N/A"}</div>
      </div>
    </Modal>
  );
} 