// app/api/users/route.ts
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { createUser } from "@/actions/auth/createUser";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    const body = await request.json();

    // Validate required fields at API level
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Call the server action
    const result = await createUser({
      firstname: body.firstname,
      lastname: body.lastname,

      email: body.email,
      password: body.password,
      role: body.role || Role.CANDIDATE
    });

    if (result.success) {
      return NextResponse.json(result.message, { status: 201 });
    } else {
      // Map server action errors to appropriate status codes
      const statusCode = result.message?.includes("already exists")
        ? 409
        : result.message?.includes("not found")
        ? 404
        : result.message?.includes("Invalid email")
        ? 400
        : 500;

      return NextResponse.json(
        { error: result.message || "Failed to create user" },
        { status: statusCode }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
