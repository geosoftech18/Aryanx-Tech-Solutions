"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
// import { SidebarProvider } from "@/components/ui/sidebar";
import { DisclaimerPopup } from "@/components/disclaimer";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider><Toaster/><DisclaimerPopup/>{children}</SessionProvider>;
};
