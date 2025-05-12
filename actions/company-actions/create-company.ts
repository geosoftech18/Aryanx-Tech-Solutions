"use server"
import prismadb from "@/lib/prismaDB";
import { Industry, Prisma, Sector } from "@prisma/client";


export async function createCompanyForEmployer(userId: string,values: Prisma.CompanyCreateInput) {
  // console.log(userId, "userId");
  const user = await prismadb.user.findUnique({ where: { id: userId } });

  if (!user || user.role !== "EMPLOYER") {
    throw new Error("User must exist and be an EMPLOYER to create a company.");
  }

  // console.log(values);

  const company = await prismadb.company.create({
    data: {
      ...values,
    },
  });

  return company;
}
