// lib/services/emailVerification.ts
import crypto from "crypto";
import { addHours } from "date-fns";
import prismadb from "./prismaDB";
import SendEmail from "./sendEmail";

export class EmailVerificationService {
  private static generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  static async createVerificationRequest(email: string) {
    const token = this.generateToken();
    const expires = addHours(new Date(), 24); // Token expires in 24 hours

    await prismadb.user.update({
      where: { email },
      data: {
        verifyToken: token,
        verifyExpires: expires,
      },
    });

    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verifyEmail?token=${token}`;

    const response:{
      success:boolean,
      message:string
    } = await SendEmail({
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <div>
          <h2>Email Verification</h2>
          <p>Please click the link below to verify your email address:</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>
        </div>
      `,
    });

    if(response.success){
      return response;
    }else{
      return {
        success:false,
        message:"an error occured at sending email"
      }
    }
  }



  static async verifyToken(token: string) {
    const user = await prismadb.user.findFirst({
      where: {
        verifyToken: token,
        verifyExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new Error("Invalid or expired verification token");
    }

    await prismadb.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verifyToken: null,
        verifyExpires: null,
      },
    });

    return user;
  }
}
