import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import prismadb from "./prismaDB";
import { Role } from "@prisma/client";
import SendEmail from "./sendEmail";

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp || !credentials?.role) {
          throw new Error("Email, OTP and role are required");
        }

        if (!Object.values(Role).includes(credentials.role as Role)) {
          throw new Error("Invalid role specified");
        }

        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // Verify OTP matches
        if (credentials.otp !== user.otp) {
          throw new Error("Invalid OTP");
        }

        // Verify user role matches requested role
        if (user.role !== credentials.role) {
          throw new Error("User role doesn't match requested role");
        }

        // Clear OTP after successful verification
        await prismadb.user.update({
          where: { email: credentials.email },
          data: { otp: null },
        });

        return {
          id: user.id,
          name: user.firstname + " " + user.lastname,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

