import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismaDB";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the company associated with the current user
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
      return new NextResponse("Company not found", { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("[COMPANY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 