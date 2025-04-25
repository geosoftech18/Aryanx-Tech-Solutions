import prismadb from "@/lib/prismaDB";
import { JobCategory, JobType } from "@prisma/client";

export async function createSampleJobs(companyId: string) {
  const jobData = [
    {
      title: "Frontend Developer",
      description: "Work on UI components using React.",
      location: "Remote",
      type: JobType.INTERNSHIP,
      category: JobCategory.FINANCE,
      salary: 70000,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      skills: ["React", "JavaScript", "CSS"],
    },
    {
      title: "Backend Developer",
      description: "Develop REST APIs using Node.js.",
      location: "Bangalore",
      type: JobType.FULL_TIME,
      category: JobCategory.FINANCE,
      salary: 80000,
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      skills: ["Node.js", "Express", "MongoDB"],
    },
    {
      title: "Product Designer",
      description: "Create and manage design systems.",
      location: "Mumbai",
      type: JobType.REMOTE,
      category: JobCategory.FINANCE,
      salary: 60000,
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      skills: ["Figma", "UX", "UI"],
    },
  ];

  const jobs = await Promise.all(
    jobData.map((job) =>
      prismadb.job.create({
        data: {
          ...job,
          companyId,
        },
      })
    )
  );

  return jobs;
}
