import { ApplicationsTable } from "@/components/admin/applications/applications-table";

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* <div>
        <h2 className="text-xl font-semibold mb-2">Create Application</h2>
        <ApplicationForm />
      </div> */}
      <ApplicationsTable />
    </div>
  );
}
