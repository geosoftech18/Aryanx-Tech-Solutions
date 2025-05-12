import { Modal } from "./modal";

interface CompanyViewModalProps {
  company: any;
  open: boolean;
  onClose: () => void;
}

function CompanyViewModal({ company, open, onClose }: CompanyViewModalProps) {
  if (!company) return null;
  return (
    <Modal
      title="Company Details"
      description={`Details for company: ${company.name}`}
      isOpen={open}
      onClose={onClose}
    >
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-4">
          {company.logo && (
            <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-full object-cover" />
          )}
          <div>
            <div className="font-semibold text-lg">{company.name}</div>
            <div className="text-xs text-muted-foreground">{company.industry} | {company.sector}</div>
          </div>
        </div>
        <div><span className="font-semibold">Description:</span> {company.description}</div>
        <div><span className="font-semibold">Employees:</span> {company.employees}</div>
        <div><span className="font-semibold">Website:</span> <a href={company.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{company.website}</a></div>
        <div><span className="font-semibold">Created At:</span> {company.createdAt ? new Date(company.createdAt).toLocaleString() : "N/A"}</div>
        <div><span className="font-semibold">Updated At:</span> {company.updatedAt ? new Date(company.updatedAt).toLocaleString() : "N/A"}</div>
      </div>
    </Modal>
  );
}

export default CompanyViewModal; 