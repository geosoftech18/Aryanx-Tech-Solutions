import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismaDB";
import { ApplicationStatus, JobCategory } from "@prisma/client";
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
          include: {
            applications: true,
          },
        },
      },
    });

    if (!company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    // Calculate analytics
    const totalJobs = company.jobs.length;
    const activeJobs = company.jobs.filter(job => new Date(job.deadline) > new Date()).length;
    const totalApplications = company.jobs.reduce((acc, job) => acc + job.applications.length, 0);
    
    // Get applications from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newApplications = company.jobs.reduce((acc, job) => 
      acc + job.applications.filter(app => new Date(app.createdAt) > sevenDaysAgo).length, 0
    );

    // Get scheduled interviews (applications with INTERVIEW status)
    const scheduledInterviews = company.jobs.reduce((acc, job) => 
      acc + job.applications.filter(app => app.status === ApplicationStatus.INTERVIEW).length, 0
    );

    // Get hires made in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const hiresMade = company.jobs.reduce((acc, job) => 
      acc + job.applications.filter(app => 
        app.status === ApplicationStatus.ACCEPTED && 
        new Date(app.updatedAt) > thirtyDaysAgo
      ).length, 0
    );

    // Get applications by status
    const applicationsByStatus = company.jobs.reduce((acc, job) => {
      job.applications.forEach(app => {
        acc[app.status] = (acc[app.status] || 0) + 1;
      });
      return acc;
    }, {} as Record<ApplicationStatus, number>);

    // Get recent applications
    const recentApplications = company.jobs
      .flatMap(job => 
        job.applications.map(app => ({
          ...app,
          job: {
            id: job.id,
            title: job.title,
          },
        }))
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    // Get job categories
    const jobCategories = company.jobs.reduce((acc, job) => {
      acc[job.category] = (acc[job.category] || 0) + 1;
      return acc;
    }, {} as Record<JobCategory, number>);

    // Calculate average salary
    const averageSalary = company.jobs.reduce((acc, job) => acc + (job.salary || 0), 0) / totalJobs || 0;

    return NextResponse.json({
      totalJobs,
      activeJobs,
      totalApplications,
      newApplications,
      scheduledInterviews,
      hiresMade,
      applicationsByStatus,
      recentApplications,
      jobCategories: Object.entries(jobCategories).map(([category, count]) => ({
        category,
        count,
      })),
      averageSalary,
    });
  } catch (error) {
    console.error("[ANALYTICS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 