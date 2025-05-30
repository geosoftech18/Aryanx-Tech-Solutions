import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Create Team Members (maps to the 'Meet Our Team' section)
  // Each object represents a team member card with their details
  const teamMembers = await prisma.aboutUsTeamMember.createMany({
    data: [
      {
        // Name of the team member (displayed as card title)
        name: "Vijayalakshmi Sharad Khot",
        // Role/position (displayed under the name)
        role: "Director & Co-Founder",
        // Short biography (displayed in the card)
        bio: "With over 15 years of experience in recruitment and HR, Vijayalakshmi leads our strategic initiatives and oversees our DEIB programs.",
        // Image path (used for the profile picture)
        image: "/professional-woman-director-ceo.png",
        // Email address (used for contact link)
        email: "vijaya@aryanxtechsolutions.com",
        // Social links (used for LinkedIn, Twitter, Instagram, Website icons)
        linkedin: "https://linkedin.com/in/vijayalakshmi-khot",
        twitter: "https://twitter.com/vijayalakshmi_k",
        instagram: null,
        website: "https://aryanxtechsolutions.com/team/vijayalakshmi",
      },
      {
        name: "Sulakshana Sharad Khot Borkar",
        role: "Director & Co-Founder",
        bio: "Sulakshana brings extensive expertise in talent acquisition and organizational development, focusing on creating inclusive workplaces.",
        image: "/professional-woman-executive-director.png",
        email: "sulakshana@aryanxtechsolutions.com",
        linkedin: "https://linkedin.com/in/sulakshana-borkar",
        twitter: null,
        instagram: "https://instagram.com/sulakshana.borkar",
        website: "https://aryanxtechsolutions.com/team/sulakshana",
      },
      {
        name: "Rahul Sharma",
        role: "Head of Talent Acquisition",
        bio: "Rahul leads our talent acquisition team with a focus on connecting exceptional candidates with the right opportunities across industries.",
        image: "/placeholder-0hqoa.png",
        email: "rahul@aryanxtechsolutions.com",
        linkedin: "https://linkedin.com/in/rahul-sharma",
        twitter: "https://twitter.com/rahulsharma",
        instagram: null,
        website: "https://aryanxtechsolutions.com/team/rahul",
      },
    ],
  });

  // 2. Create Specializations (maps to 'Our Specializations' grid)
  // Each object is a specialization badge shown in the grid
  const specializations = await prisma.aboutUsSpecialization.createMany({
    data: [
      { title: "IT Recruitment" }, // IT Recruitment badge
      { title: "Executive Search" }, // Executive Search badge
      { title: "Contract Staffing" }, // Contract Staffing badge
      { title: "Project-based Hiring" }, // Project-based Hiring badge
    ],
  });

  // 3. Create Stats (maps to the animated stats in the middle column)
  // Each object is a stat shown with an animated number and label
  const stats = await prisma.aboutUsStat.createMany({
    data: [
      { value: 500, label: "Successful Placements" }, // 500 Successful Placements
      { value: 50, label: "Partner Companies" }, // 50 Partner Companies
      { value: 95, label: "Client Satisfaction" }, // 95% Client Satisfaction
      { value: 10, label: "Years Experience" }, // 10 Years Experience
    ],
  });

  // 4. Create Tabs (maps to the DEIB Commitment tabs)
  // Each object is a tab for Diversity, Equity, Inclusion, Belonging
  const tabs = await prisma.aboutUsTab.createMany({
    data: [
      {
        value: "diversity", // Tab value (used for tab switching)
        icon: "diversity", // Icon name (used for the tab icon)
        title: "Diversity Hiring Initiatives", // Tab title
        description:
          "We actively partner with organizations to build diverse, dynamic teams that reflect the richness of the communities they serve.", // Tab content
      },
      {
        value: "equity",
        icon: "scale",
        title: "Equity-Focused Processes",
        description:
          "Every candidate is assessed fairly based on skills, experience, and potential, ensuring unbiased opportunities for career growth.",
      },
      {
        value: "inclusion",
        icon: "users",
        title: "Inclusive Recruitment Practices",
        description:
          "We implement sourcing and hiring methods that foster an inclusive, accessible, and welcoming experience for all candidates.",
      },
      {
        value: "belonging",
        icon: "heart",
        title: "Belonging-Centered Culture",
        description:
          "Beyond recruitment, we help our clients nurture workplaces where every employee feels accepted, supported, and empowered to contribute meaningfully.",
      },
    ],
  });

  // 4. Create Why Choose Us Cards (maps to the 6 cards in the Why Choose Us section)
  const whyChooseUsCards = await prisma.aboutUsWhyChooseUsCard.createMany({
    data: [
      {
        title: "Industry Expertise",
        description: "Industry-specific recruitment expertise across IT, non-IT, and specialized sectors.",
        icon: "Award",
      },
      {
        title: "Dedicated Teams",
        description: "Dedicated account management and talent acquisition teams focused on your success.",
        icon: "UserCheck",
      },
      {
        title: "Tailored Solutions",
        description: "Agile and scalable hiring solutions tailored to your specific business needs.",
        icon: "CheckCircle",
      },
      {
        title: "Extensive Network",
        description: "Extensive talent database and proactive sourcing strategies to find the perfect match.",
        icon: "Users",
      },
      {
        title: "Long-term Partnerships",
        description: "Commitment to quality, transparency, and building long-term partnerships.",
        icon: "Link2",
      },
      {
        title: "Fair Practices",
        description: "Commitment to fair, transparent, and people-centric hiring practices.",
        icon: "Scale",
      },
    ],
  });

  // 5. Create AboutUs main record (maps to the main About Us page content)
  // This object holds all the static text and links all the above components
  await prisma.aboutUs.create({
    data: {
      // Company name (used in hero and other sections)
      companyName: "Aryanx Tech Solutions Private Limited",
      // Hero section title
      heroTitle: "About Aryanx Tech Solutions",
      // Hero section subtitle
      heroSubtitle:
        "A dynamic and forward-thinking recruitment and staffing firm committed to connecting exceptional talent with leading organizations.",
      // Hero image path
      heroImage: "/images/about-image.png",
      // Mission section title
      missionTitle: "Our Mission",
      // Mission section text
      missionText:
        "Aryanx Tech Solutions Private Limited is a dynamic and forward-thinking recruitment and staffing firm committed to connecting exceptional talent with leading organizations.",
      // Approach section title
      approachTitle: "Our Approach",
      // Approach section text
      approachText:
        "With a deep understanding of diverse industries and an unwavering focus on quality, we deliver customized staffing solutions designed to help businesses thrive in a competitive market.",
      // Promise section title
      promiseTitle: "Our Promise",
      // Promise section text
      promiseText:
        "Founded with a vision to simplify the hiring process, Aryanx Tech Solutions serves as a trusted partner for companies seeking to build strong, reliable, and agile teams.",
      // Story section title
      storyTitle: "Our Story",
      // Story section text (used as section heading)
      storyText: "Who We Are",
      // Team section title
      teamTitle: "Our Leadership",
      // Team section subtitle
      teamSubtitle:
        "Aryanx Tech Solutions Private Limited is a Mumbai-based recruitment and staffing firm established in November 2023. As of May 2025, the company remains active and is led by a team of experienced professionals dedicated to inclusive recruitment practices.",
      // Vision section title
      visionTitle: "Our Vision",
      // Vision section text
      visionText:
        "To be a trusted, innovative, and inclusive recruitment partner that transforms businesses and careers by connecting exceptional talent with meaningful opportunities, fostering workplaces that embrace diversity, equity, inclusion, and belonging.",
      // Mission section (again, for the card)
      missionSectionTitle: "Our Mission",
      missionSectionText:
        "At Aryanx Tech Solutions Private Limited, our mission is to deliver customized, high-quality staffing and recruitment solutions that empower organizations to build agile, diverse, and future-ready teams. We are committed to fair, transparent, and people-centric hiring practices that create equal opportunities for all and contribute to the growth and success of individuals, businesses, and communities.",
      // Why Choose Us section title
      whyChooseUsTitle: "Why Choose Us?",
      // Why Choose Us section subtitle
      whyChooseUsSubtitle:
        "Partner with Aryanx Tech Solutions Private Limited —Where potential connects with possibilities.",
      // DEIB Commitment section title
      deibTitle: "Commitment to Diversity, Equity, Inclusion & Belonging",
      // DEIB Commitment section subtitle
      deibSubtitle:
        "At Aryanx Tech Solutions Private Limited, we believe that people are the heart of every successful business — and that true innovation and progress happen when diverse voices come together.",
      // CTA section title
      ctaTitle: "Ready to Build Your Dream Team?",
      // CTA section subtitle
      ctaSubtitle:
        "Partner with Aryanx Tech Solutions and connect with the talent your organization needs to thrive.",
      // CTA button 1 text
      ctaButton1Text: "Contact Us Today",
      // CTA button 2 text
      ctaButton2Text: "Learn About Our Services",
      // Link all team members
      teamMembers: {
        connect: (await prisma.aboutUsTeamMember.findMany()).map((t) => ({ id: t.id })),
      },
      // Link all specializations
      specializations: {
        connect: (await prisma.aboutUsSpecialization.findMany()).map((s) => ({ id: s.id })),
      },
      // Link all stats
      stats: {
        connect: (await prisma.aboutUsStat.findMany()).map((s) => ({ id: s.id })),
      },
      // Link all DEIB tabs
      tabs: {
        connect: (await prisma.aboutUsTab.findMany()).map((t) => ({ id: t.id })),
      },
      whyChooseUsCards: {
        connect: (await prisma.aboutUsWhyChooseUsCard.findMany()).map((c) => ({ id: c.id })),
      },
    },
  });

  console.log("AboutUs seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 