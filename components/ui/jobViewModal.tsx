import { Modal } from "./modal";

// JobViewModal: shows job and company details in a modal
function JobViewModal({ job, open, onClose }: { job: any; open: boolean; onClose: () => void }) {
    if (!job) return null;
    return (
      <Modal
        title="Job Details"
        description={`Details for job: ${job.title}`}
        isOpen={open}
        onClose={onClose}
      >
        <div className="space-y-2 text-sm">
          <div><span className="font-semibold">Title:</span> {job.title}</div>
          <div><span className="font-semibold">Description:</span> {job.description}</div>
          <div><span className="font-semibold">Location:</span> {job.location}</div>
          <div><span className="font-semibold">Type:</span> {job.type}</div>
          <div><span className="font-semibold">Category:</span> {job.category}</div>
          <div><span className="font-semibold">Salary:</span> {job.salary ?? 'N/A'}</div>
          <div><span className="font-semibold">Deadline:</span> {job.deadline ? new Date(job.deadline).toLocaleString() : 'N/A'}</div>
          <div><span className="font-semibold">Experience:</span> {job.experience ?? 'N/A'}</div>
          <div><span className="font-semibold">Skills:</span> {Array.isArray(job.skills) ? job.skills.join(", ") : ''}</div>
          <div><span className="font-semibold">Featured:</span> {job.isFeatured ? 'Yes' : 'No'}</div>
          <div><span className="font-semibold">Active:</span> {job.isActive ? 'Yes' : 'No'}</div>
          <div className="mt-2 font-semibold">Company Details:</div>
          <div><span className="font-semibold">Name:</span> {job.company?.name}</div>
          <div><span className="font-semibold">Description:</span> {job.company?.description}</div>
          <div><span className="font-semibold">Industry:</span> {job.company?.industry}</div>
          <div><span className="font-semibold">Sector:</span> {job.company?.sector}</div>
          <div><span className="font-semibold">Employees:</span> {job.company?.employees}</div>
          <div><span className="font-semibold">Website:</span> {job.company?.website}</div>
        </div>
      </Modal>
    );
  }

  export default JobViewModal;