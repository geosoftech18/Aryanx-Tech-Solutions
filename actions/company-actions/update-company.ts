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
  userId: string, 
  data: Prisma.CompanyUpdateInput
): Promise<UpdateCompanyResponse> {
  try {
    // Check if company exists
    const existingCompany = await prismadb.company.findUnique({
      where: { userId: userId },
    });

    if (!existingCompany) {
      throw new CompanyUpdateError(`Company with USER'S ID ${userId} not found`);
    }

    // Update company
    const updatedCompany = await prismadb.company.update({
      where: { userId: userId },
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