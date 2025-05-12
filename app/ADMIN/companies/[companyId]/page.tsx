import CompanyForm from "@/components/admin/companies/CompanyForm";
import { getCompanyDetails } from "@/actions/admin/companies/get-company-details";
import { notFound } from "next/navigation";
import { Industry, Sector } from "@prisma/client";

interface PageProps {
    params: Promise<{
      companyId: string | null;
    }>;
  }

export default async function CompanyModePage({ params }: PageProps) {
  const { companyId } = await params;

  if (companyId === "create" || companyId === null) {
    // Render empty form for create
    return <CompanyForm initialData={null} companyId={null} />;
  }

  const company = await getCompanyDetails(companyId);

  if (!company) {
    return notFound();
  }

  // Map company to initialData for the form
  const initialData = {
    name: company.name,
    description: company.description,
    logo: company.logo || "",
    website: company.website || "",
    employees: company.employees || "",
    industry: company.industry as Industry,
    sector: company.sector as Sector,
    user: { connect: { id: company.userId } },
  };

  return <CompanyForm initialData={initialData} companyId={companyId} />;
}
