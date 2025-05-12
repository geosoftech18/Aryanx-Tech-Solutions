import type React from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/admin/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
        {/* <div className="flex min-h-screen bg-gray-50"> */}
        <DashboardSidebar />
        <SidebarInset>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarInset>
        {/* </div> */}
      </SidebarProvider>
  );
}
