"use server";

import { EmailVerificationService } from "@/lib/emailVerification";
import prismadb from "@/lib/prismaDB";
import { Role, User } from "@prisma/client";
import bcrypt from "bcryptjs";

type MakeSomeRequiredAndOthersOptional<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;

type UserType =  MakeSomeRequiredAndOthersOptional<
  User,
  "firstname" | "lastname" | "password" | "email"
>;

export async function createUser({
  firstname,
  middlename,
  lastname,
  email,
  password,
  role = Role.CANDIDATE,
  image,
  resume,
  skills = [],
  companyId,
}: UserType): Promise<{
  success: boolean;
  // user?: any;
  message: string;
}> {
  try {
    // Validate required fields
    if (!firstname || !lastname || !email || !password) {
      return {
        success: false,
        message: "Name, email, and password are required",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Invalid email format" };
    }

    // Check if user already exists
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, message: "User with this email already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Validate company exists if companyId is provided
    if (companyId) {
      const company = await prismadb.company.findUnique({
        where: { id: companyId },
      });
      if (!company) {
        return { success: false, message: "Company not found" };
      }
    }

    // Create user
    const user = await prismadb.user.create({
      data: {
        firstname,
        middlename,
        lastname,
        email,
        password: hashedPassword,
        role,
        image,
        resume,
        skills,
        companyId,
        emailVerified: false,
      },
      select: {
        id: true,
        firstname: true,
        middlename: true,
        lastname: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    // Generate and send verification email
    const response:{
      success:boolean,
      message:string
    } = await EmailVerificationService.createVerificationRequest(email);

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "An error occurred while creating the user",
    };
  }
}
