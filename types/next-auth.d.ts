
import NextAuth, { DefaultUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string | null;
      role: "CANDIDATE" | "EMPLOYER" | "ADMIN"; 
    };
  }

  interface User extends DefaultUser {
    role: "CANDIDATE" | "EMPLOYER" | "ADMIN"; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    role: "CANDIDATE" | "EMPLOYER" | "ADMIN"; 
  }
}

declare module "leaflet" {
  interface IconDefault {
    _getIconUrl?: () => string;
  }
}
