import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Create Feature Slides
  const featureSlides = await prisma.homepageFeatureSlide.createMany({
    data: [
      {
        heading: "Find Your Dream Job",
        subheading: "Thousands of opportunities await",
        description:
          "Connect with top employers and discover roles that match your skills and aspirations. Our intelligent matching system helps you find the perfect fit.",
        buttonText: "Search Jobs",
        buttonLink: "/jobs",
        image: "/slider-job-search.png",
        color: "from-blue-600 to-indigo-700",
      },
      {
        heading: "Build Your Career Profile",
        subheading: "Stand out to employers",
        description:
          "Create a comprehensive profile that showcases your skills, experience, and achievements. Get noticed by companies looking for talent like you.",
        buttonText: "Create Profile",
        buttonLink: "/profile/create",
        image: "/slider-career-profile.png",
        color: "from-purple-600 to-pink-600",
      },
      {
        heading: "Remote Opportunities",
        subheading: "Work from anywhere",
        description:
          "Explore thousands of remote positions that offer flexibility and work-life balance. Find roles that let you work from the comfort of your home.",
        buttonText: "View Remote Jobs",
        buttonLink: "/jobs?type=remote",
        image: "/slider-remote-work.png",
        color: "from-emerald-600 to-teal-700",
      },
    ],
  });

  // 2. Create Partners
  const partners = await prisma.partner.createMany({
    data: [
      { name: "TechCorp", logoUrl: "/accenture.png" },
      { name: "InnovateTech", logoUrl: "/accenture.png" },
      { name: "CloudSolutions", logoUrl: "/accenture.png" },
      { name: "DesignHub", logoUrl: "/accenture.png" },
      { name: "DataInsights", logoUrl: "/accenture.png" },
      { name: "GrowthMarketing", logoUrl: "/accenture.png" },
      { name: "SecureTech", logoUrl: "/accenture.png" },
      { name: "GlobalConnect", logoUrl: "/accenture.png" },
    ],
  });

  // 3. Create Business Impact Stats
  const stats = await prisma.homepageStat.createMany({
    data: [
      {
        percentage: 96,
        description: "We work with 96% of Fortune's top 50 world's most admired companies",
      },
      {
        percentage: 80,
        description: "We work with 80% of the Drucker Institute's top performing companies",
      },
      {
        percentage: 75,
        description: "3 in every 4 of Fortune's best companies to work for are JobSphere clients",
      },
    ],
  });

  // 4. Create How It Works Steps
  const steps = await prisma.homepageStep.createMany({
    data: [
      {
        icon: "users",
        title: "Create an Account",
        description: "Sign up and create your profile with your experience, skills, and resume.",
      },
      {
        icon: "search",
        title: "Find Matching Jobs",
        description: "Search for jobs that match your skills and preferences, or receive personalized recommendations.",
      },
      {
        icon: "check-circle-2",
        title: "Apply and Get Hired",
        description: "Submit your application with just a few clicks and track your application status.",
      },
    ],
  });

  // 5. Create CTA Section
  const ctas = await prisma.homepageCta.createMany({
    data: [
      {
        title: "Ready to Find Your Dream Job?",
        subtitle: "Create your account today and start exploring thousands of opportunities.",
        button1Text: "Sign Up as a Candidate",
        button1Link: "/auth/signup",
        button2Text: "For Employers",
        button2Link: "/auth/signup",
      },
    ],
  });

  // 6. Create Homepage (with section titles/subtitles)
  await prisma.homepage.create({
    data: {
      featureSlides: {
        connect: (await prisma.homepageFeatureSlide.findMany()).map((p) => ({ id: p.id })),
      },
      searchTitle: "Find Your Dream Job Today",
      searchSubtitle: "Connect with thousands of employers and take the next step in your career.",
      categoryTitle: "Browse by Category",
      categorySubtitle: "Explore opportunities across various industries and find your perfect role in a field you’re passionate about.",
      partnerTitle: "Our Partners",
      partnerSubtitle: "We collaborate with leading companies across various industries to bring you the best job opportunities.",
      partner: {
        connect: (await prisma.partner.findMany()).map((p) => ({ id: p.id })),
      },
      statsTitle: "Business Impact",
      statsSubtitle: "Our reach and results",
      stats: {
        connect: (await prisma.homepageStat.findMany()).map((s) => ({ id: s.id })),
      },
      stepsTitle: "How JobSphere Works",
      stepsSubtitle: "Your journey to the perfect job is just a few steps away.",
      steps: {
        connect: (await prisma.homepageStep.findMany()).map((s) => ({ id: s.id })),
      },
      cta: {
        connect: (await prisma.homepageCta.findMany()).map((c) => ({ id: c.id })),
      },
    },
  });

  console.log("Homepage seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });