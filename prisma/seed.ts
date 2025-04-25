import { PrismaClient, JobType, JobCategory, Industry, Sector } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const jobTitles = [
  "Senior Software Engineer",
  "Product Manager",
  "UX Designer",
  "Data Scientist",
  "Marketing Manager",
  "Sales Representative",
  "Financial Analyst",
  "HR Manager",
  "DevOps Engineer",
  "Content Writer",
];

const locations = [
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
];

const skills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "AWS",
  "SQL",
  "Java",
  "TypeScript",
  "Docker",
  "Kubernetes",
  "Marketing",
  "Sales",
  "Communication",
  "Leadership",
  "Project Management",
];

const companies = [
  {
    name: "TechCorp Solutions",
    description: "Leading technology solutions provider",
    industry: Industry.TECHNOLOGY,
    sector: Sector.PRIVATE,
    employees: "1000-5000",
  },
  {
    name: "HealthCare Plus",
    description: "Innovative healthcare solutions",
    industry: Industry.HEALTHCARE,
    sector: Sector.PUBLIC,
    employees: "5000-10000",
  },
  {
    name: "EduTech Innovations",
    description: "Revolutionary education technology",
    industry: Industry.EDUCATION,
    sector: Sector.STARTUP,
    employees: "50-200",
  },
  {
    name: "FinServ Global",
    description: "Global financial services provider",
    industry: Industry.FINANCE,
    sector: Sector.MULTINATIONAL,
    employees: "10000+",
  },
  {
    name: "RetailMart",
    description: "Leading retail chain",
    industry: Industry.RETAIL,
    sector: Sector.PRIVATE,
    employees: "5000-10000",
  },
];

async function main() {
  console.log("Starting seeding...");

  // First, let's get all existing companies to avoid duplicates
  const existingCompanies = await prisma.company.findMany({
    select: { userId: true },
  });
  const existingUserIds = existingCompanies.map((c) => c.userId);

  // Create sample companies with jobs
  for (const companyData of companies) {
    // Create a sample user for the company if it doesn't exist

    const user = await prisma.user.create({
      data: {
        email: `sample_${companyData.name
          .toLowerCase()
          .replace(/\s+/g, "_")}@example.com`,
        password: await hash("sample123", 12),
        firstname: "Sample",
        lastname: companyData.name,
        role: "EMPLOYER",
        emailVerified: true,
      },
    });

    // Create company
    const company = await prisma.company.create({
      data: {
        name: companyData.name,
        description: companyData.description,
        industry: companyData.industry,
        sector: companyData.sector,
        employees: companyData.employees,
        userId: user.id,
      },
    });

    // Create 3-5 jobs for each company
    const numJobs = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < numJobs; i++) {
      const randomSalary = Math.floor(Math.random() * 2700000) + 300000; // 3L to 30L
      const randomSkills = [...skills]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 5) + 3);

      await prisma.job.create({
        data: {
          title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
          description: `We are looking for an experienced ${jobTitles[i]} to join our team...`,
          location: locations[Math.floor(Math.random() * locations.length)],
          type: Object.values(JobType)[
            Math.floor(Math.random() * Object.values(JobType).length)
          ],
          category:
            Object.values(JobCategory)[
              Math.floor(Math.random() * Object.values(JobCategory).length)
            ],
          salary: randomSalary,
          deadline: new Date(
            Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
          ),
          skills: randomSkills,
          isFeatured: Math.random() > 0.7,
          companyId: company.id,
        },
      });
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
