import { NotificationType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedNotifications() {
  const candidateId = "6802c3ece335554a3fcada81";
  const companyId = "680bbe3bbcd6d9b5562b157a";
  const recruiterUserId = "680a53b1634ae6e2f7d28d17";
  const candidateUserId = "6802c3ece335554a3fcada81";

  // First, let's get some jobs and applications to reference
  const jobs = await prisma.job.findMany({
    where: {
      companyId: companyId,
    },
  });

  const applications = await prisma.application.findMany({
    where: {
      candidateId,
    },
  });

  // Create notifications for the candidate
  const candidateNotifications = [
    // Application Status Updates
    {
      type: NotificationType.APPLICATION_STATUS_UPDATED,
      title: "Application Status Update",
      message:
        "Your application status for Software Engineer position has been updated",
      userId: candidateUserId,
      jobId: jobs[0]?.id,
      applicationId: applications[0]?.id,
      isRead: false,
    },
    {
      type: NotificationType.APPLICATION_STATUS_UPDATED,
      title: "Interview Scheduled",
      message: "You have been scheduled for an interview on Monday at 2 PM",
      userId: candidateUserId,
      jobId: jobs[0]?.id,
      applicationId: applications[0]?.id,
      isRead: false,
    },
    {
      type: NotificationType.APPLICATION_STATUS_UPDATED,
      title: "Congratulations!",
      message:
        "Your application has been accepted! Next steps will be sent shortly.",
      userId: candidateUserId,
      jobId: jobs[1]?.id,
      applicationId: applications[1]?.id,
      isRead: false,
    },
    // Job Recommendations
    {
      type: NotificationType.NEW_JOB_POSTED,
      title: "New Job Match",
      message:
        "We found a new job that matches your profile: Senior Developer position",
      userId: candidateUserId,
      jobId: jobs[2]?.id,
      isRead: false,
    },
    {
      type: NotificationType.NEW_JOB_POSTED,
      title: "New Job Match",
      message:
        "We found a new job that matches your profile: Senior Developer position",
      userId: candidateUserId,
      jobId: jobs[3]?.id,
      isRead: false,
    },
  ];

  // Create notifications for the recruiter
  const recruiterNotifications = [
    // New Applications
    {
      type: NotificationType.NEW_APPLICATION_RECEIVED,
      title: "New Application Received",
      message: "A new candidate has applied for the Software Engineer position",
      userId: recruiterUserId,
      jobId: jobs[0]?.id,
      applicationId: applications[0]?.id,
      isRead: false,
    },
    {
      type: NotificationType.NEW_APPLICATION_RECEIVED,
      title: "New Application Received",
      message: "A new candidate has applied for the Software Engineer position",
      userId: recruiterUserId,
      jobId: jobs[2]?.id,
      applicationId: applications[0]?.id,
      isRead: false,
    },
    {
      type: NotificationType.NEW_APPLICATION_RECEIVED,
      title: "New Application Received",
      message: "A new candidate has applied for the Software Engineer position",
      userId: recruiterUserId,
      jobId: jobs[1]?.id,
      applicationId: applications[0]?.id,
      isRead: false,
    },
  ];

  // Delete existing notifications for these users
  await prisma.notification.deleteMany({
    where: {
      userId: {
        in: [candidateUserId, recruiterUserId],
      },
    },
  });

  // Create all notifications
  await prisma.notification.createMany({
    data: [...candidateNotifications, ...recruiterNotifications],
  });

  console.log("Notifications seeded successfully!");
}

seedNotifications()
  .catch((error) => {
    console.error("Error seeding notifications:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
