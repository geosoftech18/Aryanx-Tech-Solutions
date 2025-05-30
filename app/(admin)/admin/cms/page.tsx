"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import {  Role } from "@prisma/client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import HomepageFormWrapper from "./forms/homepage-form"
import AboutUsFormWrapper from "./forms/aboutus-form-wrapper"

export default function AdminCMSPage() {
  const { data: session } = useSession()
  const [tab, setTab] = useState("homepage")


  if (!session || session.user.role !== Role.ADMIN) {
    return <div className="p-8 text-center text-red-500 font-semibold">Unauthorized: Admins only</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Static Content Management</h1>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="aboutus">About Us</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="ats-capabilities">ATS Capabilities</TabsTrigger>
          <TabsTrigger value="why-choose-us">Why Choose Us</TabsTrigger>
          <TabsTrigger value="trainning-hub">Training Hub</TabsTrigger>
        </TabsList>
        {/* Homepage Tab */}
        <TabsContent value="homepage">
          <HomepageFormWrapper/>
        </TabsContent>
        {/* About Us Tab */}
        <TabsContent value="aboutus">
          <AboutUsFormWrapper />
        </TabsContent>
        {/* Contact Tab */}
        <TabsContent value="contact">
          <div className="bg-white rounded-lg p-6 shadow-sm">Contact content form (to be implemented)</div>
        </TabsContent>
        {/* ATS Capabilities Tab */}
        <TabsContent value="ats-capabilities">
          <div className="bg-white rounded-lg p-6 shadow-sm">ATS Capabilities content form (to be implemented)</div>
        </TabsContent>
        {/* Why Choose Us Tab */}
        <TabsContent value="why-choose-us">
          <div className="bg-white rounded-lg p-6 shadow-sm">Why Choose Us content form (to be implemented)</div>
        </TabsContent>
        {/* Training Hub Tab */}
        <TabsContent value="trainning-hub">
          <div className="bg-white rounded-lg p-6 shadow-sm">Training Hub content form (to be implemented)</div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 