import prismadb from "@/lib/prismaDB";

export async function getCandidateApplicationsByUserId(userId: string) {
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

  return applications.map((application) => ({
    ...application.job.company,
    ...application.job, // Spread job fields
    ...application, // Spread application fields
  }));
}
