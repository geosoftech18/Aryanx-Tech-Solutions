"use server";

import prismadb from "@/lib/prismaDB";
import { Notification, NotificationType } from "@prisma/client";
import axios from "axios";

interface CreateNotificationParams {
  type: NotificationType;
  title: string;
  message: string;
  employerId: string;
  jobId?: string;
  applicationId?: string;
  shouldEmail?: boolean;
}

// Helper function to send email using Brevo
async function sendEmailNotification(to: string, subject: string, message: string) {
  try {
    const apiKey = process.env.SENDINBLUE_API_KEY;
    const apiUrl = "https://api.brevo.com/v3/smtp/email";

    if (!apiKey) {
      throw new Error("Brevo API key not found");
    }

    // Convert plain text message to basic HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${subject}</h2>
        <p style="color: #666; line-height: 1.6;">${message}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #888; font-size: 12px;">This is an automated notification from Job Portal</p>
      </div>
    `;

    const emailData = {
      to: [{ email: to }],
      sender: { 
        name: "Job Portal", 
        email: process.env.NEXT_PUBLIC_contactEmail 
      },
      subject: subject,
      htmlContent: htmlContent,
      headers: { "Custom-Header": "Notification" },
    };

    const response = await axios.post(apiUrl, emailData, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
    });

    console.log("Notification email sent successfully:", response.data);
    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Brevo API error:", error.response?.data || error.message);
    } else {
      console.error("Email sending error:", error);
    }
    return { success: false, error: "Failed to send email notification" };
  }
}

export async function createNotification({
  type,
  title,
  message,
  employerId,
  jobId,
  applicationId,
  shouldEmail = false,
}: CreateNotificationParams): Promise<{
  success: boolean;
  notification?: Notification;
  error?: string;
}> {
  try {
    // Create the notification in the database
    const notification = await prismadb.notification.create({
      data: {
        type,
        title,
        message,
        userId: employerId,
        jobId,
        applicationId,
      },
      include: {
        user: true,
        job: true,
        application: true,
      },
    });

    // Send email if required and user email exists
    if (shouldEmail) {
      if (notification.user && notification.user.email) {
        const emailResult = await sendEmailNotification(
          notification.user.email,
          title,
          message
        );
        if (!emailResult.success) {
          // Log and return partial success if email fails
          console.error("Email notification failed:", emailResult.error);
          return {
            success: false,
            notification,
            error: "Notification created, but failed to send email: " + emailResult.error,
          };
        }
      } else {
        // No email found for user
        console.warn("User email not found for notification:", notification.user?.id);
        return {
          success: false,
          notification,
          error: "Notification created, but user email not found.",
        };
      }
    }

    // Success: notification created (and email sent if requested)
    return { success: true, notification };
  } catch (error) {
    // Log error with context
    console.error("Error creating notification:", error);
    let errorMessage = "Failed to create notification.";
    if (error instanceof Error) {
      errorMessage += " " + error.message;
    }
    return { success: false, error: errorMessage };
  }
} 