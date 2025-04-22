"use server";

import axios from "axios";
import { z } from "zod";
import { promises as fs } from "fs";

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

export default SendEmail
