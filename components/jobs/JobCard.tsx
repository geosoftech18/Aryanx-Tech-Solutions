"use client"

import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Building2, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { formatSalary } from "@/lib/utils"
import { EmploymentType, WorkMode } from "@prisma/client"

interface Job {
  id: string
  title: string
  location: string[]
  type: EmploymentType
  workMode: WorkMode // Work mode: REMOTE, HYBRID, ON_SITE
  createdAt: Date | string
  skills: string[]
  salary?: number | null
  company: {
    name: string
    logo?: string | null
  }
}

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {job.company.logo ? (
          <Image
            src={job.company.logo || "/placeholder.svg"}
            alt={job.company.name}
            width={48}
            height={48}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
          <p className="text-gray-600 mb-2">{job.company.name}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location.join(", ")}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {job.type.replace(/_/g, " ")}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {job.workMode.replace(/_/g, " ")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            {job.salary ? <span>{formatSalary(job.salary)}</span> : <span>Salary not specified</span>}
          </div>
          <Button asChild>
            <Link href={`/jobs/${job.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
