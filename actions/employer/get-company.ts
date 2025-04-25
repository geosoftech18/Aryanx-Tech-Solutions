"use server"

import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismaDB";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function getCompany() {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const company = await prismadb.company.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        jobs: {
          select: {
            id: true,
            title: true,
            type: true,
            category: true,
            location: true,
            salary: true,
            deadline: true,
            createdAt: true,
            applications: {
              select: {
                id: true,
                status: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    if (!company) {
      throw new Error("Company not found");
    }

    return { company };
  } catch (error) {
    console.error("[GET_COMPANY]", error);
    throw error;
  }
} 