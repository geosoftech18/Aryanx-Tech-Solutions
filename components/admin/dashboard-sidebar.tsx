"use client"

import { BarChart3, Briefcase, Building2, FileText, LayoutDashboard, LogOut, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar className="light-sidebar" collapsible="icon">
      {/* <SidebarHeader className="flex flex-col items-start">
        <div className="flex items-center gap-2 px-2 py-4">
          <Briefcase className="h-6 w-6 text-blue-600" />
          <div className="text-xl font-bold text-blue-600">JobPortal</div>
        </div>
      </SidebarHeader> */}
      <SidebarSeparator className="bg-gray-100" />
      <SidebarContent>
        <SidebarMenu>
          {/* dashboard */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/ADMIN")}
              className={
                isActive("/ADMIN") ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"
              }
            >
              <Link href="/ADMIN">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           {/* users */}
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/ADMIN/users")}
              className={
                isActive("/ADMIN/users") ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"
              }
            >
              <Link href="/ADMIN/users">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* companies */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/ADMIN/companies")}
              className={
                isActive("/ADMIN/companies")
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }
            >
              <Link href="/ADMIN/companies">
                <Building2 className="h-4 w-4" />
                <span>Companies</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* candidates */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/ADMIN/candidates")}
              className={
                isActive("/ADMIN/candidates")
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }
            >
              <Link href="/ADMIN/candidates">
                <Users className="h-4 w-4" />
                <span>Candidates</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* jobs */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/ADMIN/jobs")}
              className={
                isActive("/ADMIN/jobs") ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"
              }
            >
              <Link href="/ADMIN/jobs">
                <Briefcase className="h-4 w-4" />
                <span>Jobs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* applications */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/ADMIN/applications")}
              className={
                isActive("/ADMIN/applications")
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }
            >
              <Link href="/ADMIN/applications">
                <FileText className="h-4 w-4" />
                <span>Applications</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
         
          {/* analytics */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/ADMIN/analytics")}
              className={
                isActive("/ADMIN/analytics")
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }
            >
              <Link href="/ADMIN/analytics">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* settings */}
          {/* <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/ADMIN/settings")}
              className={
                isActive("/ADMIN/settings")
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }
            >
              <Link href="/ADMIN/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator className="bg-gray-100" />
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-gray-200">
              {/* <AvatarImage src="/abstract-admin-interface.png" alt="Admin" /> */}
              <AvatarFallback className="bg-gray-100 text-gray-700">AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Admin User</span>
              <span className="text-xs text-gray-500">admin@jobportal.com</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
