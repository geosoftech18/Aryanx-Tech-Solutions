import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/"];
const AUTH_PATHS = ["/auth/login", "/auth/signup", "/auth/error"];
const PROTECTED_PATHS = ["/ADMIN", "/EMPLOYER", "/CANDIDATE"];

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (NextAuth.js endpoints)
     * - images/* (static images)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth|images/).*)",
  ],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // console.log(token + " middleware")
  // 1. Always allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    // If logged-in user tries to access login page, redirect to their dashboard
    if (token && (pathname === "/auth/login" || pathname === "/auth/signup")) {
      let destination = "/";
      switch (token.role) {
        case "ADMIN":
          destination = "/ADMIN";
          break;
        case "EMPLOYER":
          destination = "/EMPLOYER";
          break;
        case "CANDIDATE":
          destination = "/CANDIDATE";
          break;
      }
      return NextResponse.redirect(new URL(destination, req.url));
    }
    return NextResponse.next();
  }

  // 2. Handle protected routes
  if (!token && PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 3. Handle root path redirects
  // if (pathname === "/") {
  //   if (!token) return NextResponse.next();

  //   let destination = "/";
  //   switch (token.role) {
  //     case "ADMIN":
  //       destination = "/ADMIN";
  //       break;
  //     case "EMPLOYER":
  //       destination = "/EMPLOYER";
  //       break;
  //     case "CANDIDATE":
  //       destination = "/";
  //       break;
  //     default:
  //       return NextResponse.redirect(new URL("/auth/login", req.url));
  //   }
  //   return NextResponse.redirect(new URL(destination, req.url));
  // }

  return NextResponse.next();
}
