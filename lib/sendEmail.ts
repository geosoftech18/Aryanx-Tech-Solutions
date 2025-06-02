"use server";

import axios from "axios";

type EmailResponse = {
  success: boolean;
  message: string;
};

const SendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<EmailResponse> => {
  try {
    const apiKey = process.env.SENDINBLUE_API_KEY;
    const apiUrl = "https://api.brevo.com/v3/smtp/email";

    if (!apiKey) {
      return {
        success: false,
        message: "API key not found",
      };
    }
    const emailData = {
      to: [{ email: to }],
      sender: { name: "Job Portal", email: process.env.NEXT_PUBLIC_contactEmail },
      subject: subject,
      htmlContent: html,
      headers: { "Custom-Header": "OTP Form" },
    };

    const response = await axios.post(apiUrl, emailData, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
    });

    console.log("Email sent successfully:", response.data);
    return { success: true, message: "Verification link successfully sent to your mail." };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error message:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Failed to send email");
  }
};

// Helper to get the base server URL (for password reset links)
export async function getServerUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) {
    if (process.env.VERCEL_URL.startsWith("http")) return process.env.VERCEL_URL;
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export default SendEmail
