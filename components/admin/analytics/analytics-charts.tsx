"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { AdminAnalyticsCharts } from "@/actions/admin/analytics/get-admin-analytics-charts"

const jobData = [
  {
    name: "Jan",
    total: 45,
  },
  {
    name: "Feb",
    total: 62,
  },
  {
    name: "Mar",
    total: 78,
  },
  {
    name: "Apr",
    total: 56,
  },
  {
    name: "May",
    total: 69,
  },
  {
    name: "Jun",
    total: 85,
  },
  {
    name: "Jul",
    total: 92,
  },
  {
    name: "Aug",
    total: 75,
  },
  {
    name: "Sep",
    total: 88,
  },
  {
    name: "Oct",
    total: 96,
  },
  {
    name: "Nov",
    total: 110,
  },
  {
    name: "Dec",
    total: 98,
  },
]

const applicationData = [
  {
    name: "Jan",
    applications: 245,
    hires: 35,
  },
  {
    name: "Feb",
    applications: 362,
    hires: 42,
  },
  {
    name: "Mar",
    applications: 478,
    hires: 58,
  },
  {
    name: "Apr",
    applications: 356,
    hires: 46,
  },
  {
    name: "May",
    applications: 469,
    hires: 59,
  },
  {
    name: "Jun",
    applications: 585,
    hires: 75,
  },
  {
    name: "Jul",
    applications: 692,
    hires: 82,
  },
  {
    name: "Aug",
    applications: 575,
    hires: 65,
  },
  {
    name: "Sep",
    applications: 688,
    hires: 78,
  },
  {
    name: "Oct",
    applications: 796,
    hires: 86,
  },
  {
    name: "Nov",
    applications: 810,
    hires: 90,
  },
  {
    name: "Dec",
    applications: 698,
    hires: 78,
  },
]

interface AnalyticsChartsProps {
  charts: AdminAnalyticsCharts
}

export function AnalyticsCharts({  }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="light-card col-span-4">
        <CardHeader>
          <CardTitle className="text-gray-900">Job Postings</CardTitle>
          <CardDescription className="text-gray-600">Number of jobs posted per month</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={jobData}>
              <XAxis dataKey="name" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#666666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e5e7eb",
                  borderRadius: "0.5rem",
                  color: "#111827",
                  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                }}
                cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="light-card col-span-3">
        <CardHeader>
          <CardTitle className="text-gray-900">Applications vs Hires</CardTitle>
          <CardDescription className="text-gray-600">
            Comparison of applications received and successful hires
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={applicationData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="name" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#666666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e5e7eb",
                  borderRadius: "0.5rem",
                  color: "#111827",
                  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="hires" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
