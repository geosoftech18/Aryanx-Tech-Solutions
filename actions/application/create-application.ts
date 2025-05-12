"use server"

import prismadb from "@/lib/prismaDB";
import { Application, Notification, NotificationType } from "@prisma/client";
import { createNotification } from "../notifications/create-notification";

interface CreateApplicationResponse {
  success: boolean;
  application?: Application;
  notification?: Notification;
  error?: string;
}

export async function createApplication(data: { jobId: string; userId: string }): Promise<CreateApplicationResponse> {
  try {
    const { jobId, userId } = data;

    const candidate = await prismadb.candidate.findFirst({ 
      where: { userId },
      include: {
        user: true
      }
    });

    if (!candidate) {
      return {
        success: false,
        error: `Candidate profile not found for user ${userId}`
      };
    }

    const job = await prismadb.job.findUnique({ 
      where: { id: jobId },
      include: {
        company: true
      }
    });

    if (!job) {
      return {
        success: false,
        error: `Job with ID ${jobId} not found`
      };
    }

    const application = await prismadb.application.create({
      data: {
        userId,
        jobId,
        candidateId: candidate.id,
        coverLetter: "I am very excited about this opportunity!",
      },
    });

    const { success: notifSuccess, notification, error: notifError } = await createNotification({
      type: NotificationType.NEW_APPLICATION_RECEIVED,
      title: 'New Application Received',
      message: `${candidate.user.firstname} ${candidate.user.lastname} has applied for ${job.title}`,
      recipientId: job.company.userId,
      jobId: job.id,
      applicationId: application.id,
      shouldEmail: true
    });

    if (!notifSuccess) {
      console.error('Notification creation failed:', notifError);
      return {
        success: false,
        application,
        notification,
        error: `Application created, but notification failed: ${notifError}`
      };
    }

    return {
      success: true,
      application,
      notification
    };
  } catch (error) {
    console.error('Error creating application:', error);
    let errorMessage = 'Failed to create application.';
    if (error instanceof Error) {
      errorMessage += ' ' + error.message;
    }
    return {
      success: false,
      error: errorMessage
    };
  }
}
