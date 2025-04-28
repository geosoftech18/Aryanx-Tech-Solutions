"use server";

import prismadb from "@/lib/prismaDB";
import { ApplicationStatus, Application, Job, Candidate, User, Company, Education, WorkExperience, Certification } from "@prisma/client";

interface GetCompanyApplicationsParams {
  userId: string;
  status?: ApplicationStatus;
  jobId?: string;
}

type ApplicationWithRelations = Application & {
  job: Job;
  Candidate: (Candidate & {
    user: User;
    education: Education[];
    WorkExperience: WorkExperience[];
    certifications: Certification[];
  }) | null;
};

export async function getCompanyApplications({
  userId,
  status,
  jobId,
}: GetCompanyApplicationsParams): Promise<ApplicationWithRelations[]> {
  const company = await prismadb.company.findUnique({
    where: { userId },
    include: {
      jobs: {
        where: jobId ? { id: jobId } : undefined,
        include: {
          applications: {
            where: status ? { status } : undefined,
            include: {
              Candidate: {
                include: {
                  user: true,
                  education: true,
                  WorkExperience: true,
                  certifications: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!company) {
    throw new Error("Company not found");
  }

  // Flatten the applications array
  const applications = company.jobs.flatMap((job) =>
    job.applications.map((app) => ({
      ...app,
      job,
    }))
  );

  return applications;
}

type ApplicationDetails = Application & {
  job: Job & {
    company: Company;
  };
  Candidate: (Candidate & {
    user: User;
    education: Education[];
    WorkExperience: WorkExperience[];
    certifications: Certification[];
  }) | null;
};

export async function getApplicationDetails(applicationId: string): Promise<ApplicationDetails> {
  const application = await prismadb.application.findUnique({
    where: { id: applicationId },
    include: {
      job: {
        include: {
          company: true,
        },
      },
      Candidate: {
        include: {
          user: true,
          education: true,
          WorkExperience: true,
          certifications: true,
        },
      },
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<Application> {
  const application = await prismadb.application.update({
    where: { id: applicationId },
    data: { status },
  });

  return application;
} 