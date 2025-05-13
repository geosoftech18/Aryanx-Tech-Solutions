import { Role, UserStatus } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "./prismaDB";
import { linkedInProviderWithCustomFlow } from "./linkedin-auth";
import { cookies } from "next/headers";
import crypto from "crypto";

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
        };
      },
    }),
    linkedInProviderWithCustomFlow,
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account}) {
      // console.log("[NextAuth][signIn] user:", user);
      // console.log("[NextAuth][signIn] account:", account);
      // console.log("[NextAuth][signIn] profile:", profile);
      // Only handle LinkedIn provider
      if (account?.provider === "linkedin") {
        // // --- Single DB call: fetch user by email ---
        if (!user.email) {
          console.error(
            "[NextAuth][signIn] Email is required but missing from user object."
          );
          throw new Error("Email is required");
        }
        const dbUser = await prismadb.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          // --- LOGIN FLOW: User exists, use their role ---
          const role = dbUser.role;
          console.log(
            `[NextAuth][signIn] LOGIN: User exists in DB: ${user.email}, role: ${role}`
          );
          user.role = role;
          user.id = dbUser.id; // Ensure user.id is the DB ObjectId
        } else {
          let role: Role = Role.CANDIDATE;
          // Read the cookie
          const cookieStore = await cookies();
          const cookieRole = cookieStore.get("oauth_role")?.value;
          if (cookieRole && Object.values(Role).includes(cookieRole as Role)) {
            role = cookieRole as Role;
          } else {
            throw new Error(
              "Role unavailable in the cookie of the oauth callback"
            );
          }
          // Clear the oauth_role cookie after use
          cookieStore.set("oauth_role", "", { maxAge: -1, path: "/" });
          // --- SIGNUP FLOW: User does not exist, extract role from account.state ---

          console.log(
            `[NextAuth][signIn] SIGNUP: Creating new user with email: ${user.email}, role: ${role}`
          );
          const dbUser = await prismadb.user.create({
            data: {
              email: user.email ?? "",
              firstname: (user.name ?? "").split(" ")[0],
              lastname: (user.name ?? "").split(" ").slice(1).join(" "),
              password: crypto.randomBytes(32).toString("hex"),
              role,
              emailVerified: true,
              status: UserStatus.ACTIVE,
            },
          });
          console.log(
            `[NextAuth][signIn] SIGNUP: User created successfully: ${user.email}`
          );
          user.role = role;
          user.id = dbUser.id; // Ensure user.id is the DB ObjectId
        }
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      // console.log("jwt",token)
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
      console.log("session", session.user.role);
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};
