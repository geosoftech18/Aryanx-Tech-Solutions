"use server";

import prismadb from "@/lib/prismaDB";
import { createNotification } from "./create-notification";
import { CandidateType, NotificationType } from "@prisma/client";

// 1. Notify candidates when a new job is posted
export async function notifyNewJob(jobId: string) {
  try {
    // Get the job details
    const job = await prismadb.job.findUnique({
      where: { id: jobId },
      include: {
        company: true,
      },
    });

    if (!job) {
      throw new Error("Job not found");
    }

    // Find all candidates matching the job type
    const matchingCandidates = await prismadb.candidate.findMany({
      where: {
        // Add any matching criteria here
        // For example, matching skills, experience, etc.
        candidateType: job.jobFor,
      },
      include: {
        user: true,
      },
    });

    // Create notifications for each matching candidate
    const notificationPromises = matchingCandidates.map((candidate) =>
      createNotification({
        type: NotificationType.NEW_JOB_POSTED,
        title: "New Job Opportunity",
        message: `${job.company.name} posted a new job: ${job.title}`,
        userId: candidate.userId,
        jobId: job.id,
      })
    );

    await Promise.all(notificationPromises);

    return { success: true };
  } catch (error) {
    console.error("Error notifying about new job:", error);
    return { success: false, error: "Failed to send notifications" };
  }
}

// 2. Notify candidate when application status changes
export async function notifyApplicationStatusChange(applicationId: string) {
  try {
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
          },
        },
      },
    });

    if (!application?.Candidate?.userId) {
      throw new Error("Application or candidate not found");
    }

    await createNotification({
      type: NotificationType.APPLICATION_STATUS_UPDATED,
      title: "Application Status Updated",
      message: `Your application for ${application.job.title} at ${application.job.company.name} has been updated to ${application.status}`,
      userId: application.Candidate.userId,
      applicationId: application.id,
      jobId: application.jobId,
      shouldEmail: true, // Send email for status changes
    });

    return { success: true };
  } catch (error) {
    console.error("Error notifying about application status:", error);
    return { success: false, error: "Failed to send notification" };
  }
}

// 3. Notify employer about new application
export async function notifyNewApplication(applicationId: string) {
  try {
    const application = await prismadb.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          include: {
            company: {
              include: {
                user: true,
              },
            },
          },
        },
        Candidate: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!application?.job?.company?.userId) {
      throw new Error("Application details not found");
    }

    await createNotification({
      type: NotificationType.NEW_APPLICATION_RECEIVED,
      title: "New Job Application",
      message: `${application.Candidate?.user.firstname} ${application.Candidate?.user.lastname} applied for ${application.job.title}`,
      userId: application.job.company.userId,
      applicationId: application.id,
      jobId: application.jobId,
      shouldEmail: true, // Send email for new applications
    });

    return { success: true };
  } catch (error) {
    console.error("Error notifying about new application:", error);
    return { success: false, error: "Failed to send notification" };
  }
} 