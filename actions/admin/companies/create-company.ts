"use server"

import prismadb from "@/lib/prismaDB"
import { getServerSession } from "next-auth"
import { Company, Role, Industry, Sector, Prisma } from "@prisma/client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"


/**
 * Create a new company by admin.
 * Only accessible by ADMIN role.
 */
export async function createCompanyAdmin(data: Prisma.CompanyCreateInput): Promise<Company | null> {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized")

  // Ensure user relation is passed correctly
  const { user, ...rest } = data;
  // console.log(data)
  if (!user || !user.connect || !user.connect.id) {
    throw new Error("User (owner) is required to create a company.");
  }
  const company = await prismadb.company.create({
    data: {
      ...rest,
      user: { connect: { id: user.connect.id } },
    },
  })
  return company
}   