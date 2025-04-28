"use server"

import prismadb from "@/lib/prismaDB";
import { Company, Prisma } from "@prisma/client";

// Response type
type UpdateCompanyResponse = {
  success: boolean;
  data: Company;
  message: string;
};

 class CompanyUpdateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CompanyUpdateError';
  }
}

export async function updateCompany(
  companyId: string, 
  data: Prisma.CompanyUpdateInput
): Promise<UpdateCompanyResponse> {
  try {
    // Check if company exists
    const existingCompany = await prismadb.company.findUnique({
      where: { id: companyId },
    });

    if (!existingCompany) {
      throw new CompanyUpdateError(`Company with ID ${companyId} not found`);
    }

    // Update company
    const updatedCompany = await prismadb.company.update({
      where: { id: companyId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        jobs: true,
      },
    });

    return {
      success: true,
      data: updatedCompany,
      message: "Company updated successfully",
    };
  } catch (error) {
    if (error instanceof CompanyUpdateError) {
      throw error;
    }

    throw new CompanyUpdateError(
      `Failed to update company: ${error instanceof Error ? error.message : "Unknown error occurred"}`
    );
  }
}