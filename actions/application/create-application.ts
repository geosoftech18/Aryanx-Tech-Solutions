"use server"

import prismadb from "@/lib/prismaDB";

export async function createApplication(jobId: string, candidateId: string) {
  try {
    const candidate = await prismadb.candidate.findUnique({ 
      where: { id: candidateId } 
    });

    if (!candidate) {
      throw new Error(`Candidate with ID ${candidateId} not found`);
    }

    const job = await prismadb.job.findUnique({ 
      where: { id: jobId } 
    });

    if (!job) {
      throw new Error(`Job with ID ${jobId} not found`);
    }

    const userId = candidate.userId;

    try {
      const application = await prismadb.application.create({
        data: {
          userId,
          jobId,
          candidateId,
          coverLetter: "I am very excited about this opportunity!",
        },
      });

      return application;
    } catch (error) {
      throw new Error(`Failed to create application: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while processing the application');
  }
}
