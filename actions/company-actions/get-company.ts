"use server"

import prismadb from "@/lib/prismaDB";
import { Company } from "@prisma/client";

class CompanyNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CompanyNotFoundError';
  }
}

export async function getCompanyById(companyId: string): Promise<Company> {
  try {
    const company = await prismadb.company.findUnique({
      where: { id: companyId },
      include: {
        user: true,
        jobs: true,
      },
    });

    if (!company) {
      throw new CompanyNotFoundError(`Company with ID ${companyId} not found`);
    }

    return company;
  } catch (error) {
    if (error instanceof CompanyNotFoundError) {
      throw error;
    }
    throw new CompanyNotFoundError(
      `Failed to get company: ${error instanceof Error ? error.message : "Unknown error occurred"}`
    );
  }
}

export async function getCompanyByUserId(userId: string): Promise<Company> {
  try {
    const company = await prismadb.company.findUnique({
      where: { userId },
      include: {
        user: true,
        jobs: true,
      },
    });

    if (!company) {
      throw new CompanyNotFoundError(`Company for user ID ${userId} not found`);
    }

    return company;
  } catch (error) {
    if (error instanceof CompanyNotFoundError) {
      throw error;
    }
    throw new CompanyNotFoundError(
      `Failed to get company: ${error instanceof Error ? error.message : "Unknown error occurred"}`
    );
  }
} 