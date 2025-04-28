import prismadb from "@/lib/prismaDB";
import { Application, Job, Company } from "@prisma/client";

export async function getCandidateApplicationsByUserId(userId: string): Promise<(Company & Job & Application)[]> {
  try {
    const user = await prismadb.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== "CANDIDATE") {
      throw new Error("User is not a candidate or does not exist.");
    }

    const candidate = await prismadb.candidate.findUnique({
      where: { userId },
    });

    if (!candidate) {
      throw new Error("Candidate profile not found.");
    }
    // console.log(candidate);

    // First get all applications
    const applications = await prismadb.application.findMany({
      where: {
        candidateId: candidate.id,
      },
      include: {
        job: {
          include: {
            company: true, // Include the related company in the job
          },
        },
      },
    });
    // console.log(applications+"adswww");

    // Filter out applications with null jobs and map the data
    const validApplications = applications.filter((app) => app.job !== null);

    return validApplications.map((application) => {
      if (!application.job) {
        throw new Error(`Invalid application state: job is null for application ${application.id}`);
      }

      return {
        ...application.job.company,
        ...application.job,
        ...application,
      };
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getCandidateApplicationsByUserId:", error.message);
    } else {
      console.error("Error in getCandidateApplicationsByUserId:", String(error));
    }
    throw new Error("Failed to fetch candidate applications");
  }
}
