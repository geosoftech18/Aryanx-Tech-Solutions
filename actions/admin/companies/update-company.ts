"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { Company, Prisma, Role } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

/**
 * Update a company by admin.
 * Only accessible by ADMIN role.
 */
export async function updateCompany(companyId: string, data: Prisma.CompanyUpdateInput): Promise<Company> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  const company = await prismadb.company.update({
    where: { id: companyId },
    data,
  })
  return company
} 