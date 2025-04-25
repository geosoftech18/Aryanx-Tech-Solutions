import prismadb from "@/lib/prismaDB";
import { Industry, Sector } from "@prisma/client";


export async function createCompanyForEmployer(userId: string) {
  const user = await prismadb.user.findUnique({ where: { id: userId } });

  if (!user || user.role !== "EMPLOYER") {
    throw new Error("User must exist and be an EMPLOYER to create a company.");
  }

  const company = await prismadb.company.create({
    data: {
      userId,
      name: "Sample Company",
      description: "This is a sample company description.",
      logo: "/accenture.png",
      website: "https://example.com",
      employees: "50-100",
      industry: Industry.TECHNOLOGY,
      sector: Sector.PRIVATE
    },
  });

  return company;
}
