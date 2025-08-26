import { Modal } from "./modal";
import { Button } from "./button";
import ResumeModal from "@/components/viewResumeModal";
import { Application, Candidate, User, Job, Company } from "@prisma/client";
import { Eye } from "lucide-react";
import { useState } from "react";

// ApplicationViewModal: shows application, candidate, job, and company details in a modal
function ApplicationViewModal({
  FullApplication,
  open,
  onClose,
}: {
  FullApplication: (Application & { candidate: (Candidate & { user: User }) | null; job: (Job & { company: Company }) | null });
  open: boolean;
  onClose: () => void;
}) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  
  if (!FullApplication) return null;
  const candidate = FullApplication.candidate ?? null;
  const candidateUser = candidate?.user ?? null;
  const job = FullApplication.job ?? null;
  const company = job?.company ?? null;
  return (
    <Modal
      title="Application Details"
      description={`Details for application: ${FullApplication.id}`}
      isOpen={open}
      onClose={onClose}
    >
      <div className="space-y-4 text-sm ">
        {/* Candidate Details */}
        <div>
          <div className="font-semibold text-base mb-1">Candidate Details</div>
          <div>
            <span className="font-semibold">Name:</span> {candidateUser?.firstname ?? "-"} {candidateUser?.lastname ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {candidateUser?.email ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Gender:</span> {candidate?.gender ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Contact:</span> {candidate?.contact ?? "-"}
          </div>
          <div>
            <span className="font-semibold">YOE:</span> {candidate?.YOE ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Skills:</span> {Array.isArray(candidate?.skills) ? candidate.skills.join(", ") : "-"}
          </div>
          <div>
            <span className="font-semibold">Certifications:</span> -
          </div>
          <div>
            <span className="font-semibold">Resume:</span> {candidate?.resume ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResumeModal(true)}
                className="ml-2 text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Resume
              </Button>
            ) : (
              "Not uploaded"
            )}
          </div>
        </div>
        {/* Job Details */}
        <div>
          <div className="font-semibold text-base mb-1 mt-2">Job Details</div>
          <div>
            <span className="font-semibold">Title:</span> {job?.title ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Description:</span> {job?.description ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Location:</span> {job?.location ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Type:</span> {job?.type ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Category:</span> {job?.category ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Salary:</span> {job?.salary ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Deadline:</span> {job?.deadline ? new Date(job.deadline).toLocaleString() : "-"}
          </div>
          <div>
            <span className="font-semibold">Experience:</span> {job?.experience ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Skills:</span> {Array.isArray(job?.skills) ? job.skills.join(", ") : "-"}
          </div>
          <div>
            <span className="font-semibold">Featured:</span> {job?.isFeatured ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-semibold">Active:</span> {job?.isActive ? "Yes" : "No"}
          </div>
        </div>
        {/* Company Details */}
        <div>
          <div className="font-semibold text-base mb-1 mt-2">Company Details</div>
          <div>
            <span className="font-semibold">Name:</span> {company?.name ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Description:</span> {company?.description ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Industry:</span> {company?.industry ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Sector:</span> {company?.sector ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Employees:</span> {company?.employees ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Website:</span> {company?.website ?? "-"}
          </div>
        </div>
        {/* Application Details */}
        <div>
          <div className="font-semibold text-base mb-1 mt-2">Application Details</div>
          <div>
            <span className="font-semibold">Status:</span> {FullApplication.status}
          </div>
          <div>
            <span className="font-semibold">Applied On:</span> {FullApplication.createdAt ? new Date(FullApplication.createdAt).toLocaleString() : "-"}
          </div>
          <div>
            <span className="font-semibold">Cover Letter:</span> {FullApplication.coverLetter ?? "N/A"}
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {candidate?.resume && (
        <ResumeModal
          isOpen={showResumeModal}
          onClose={() => setShowResumeModal(false)}
          resumeUrl={candidate.resume}
          candidateName={`${candidateUser?.firstname || ''} ${candidateUser?.lastname || ''}`}
          allowDownload={true}
        />
      )}
    </Modal>
  );
}

export default ApplicationViewModal;