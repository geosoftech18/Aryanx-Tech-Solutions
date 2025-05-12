import { ApplicationStatus, Industry, JobType, Role, Sector, UserStatus } from "@prisma/client"
import { z } from "zod"

// Generic pagination and sorting schema 
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
})

// User filters
export const listUsersFiltersSchema = paginationSchema.extend({
  search: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
  status: z.nativeEnum(UserStatus).optional(),
})

// Job filters
export const listJobsFiltersSchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  type: z.nativeEnum(JobType).optional(),
  companyId: z.string().optional(),
})

// Company filters
export const listCompaniesFiltersSchema = paginationSchema.extend({
  search: z.string().optional(),
  industry: z.nativeEnum(Industry).optional(),
  sector: z.nativeEnum(Sector).optional(),
})

// Application filters
export const listApplicationsFiltersSchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.nativeEnum(ApplicationStatus).optional(),
})

// Candidate filters
export const listCandidatesFiltersSchema = paginationSchema.extend({
  search: z.string().optional(),
  candidateType: z.string().optional(),
  gender: z.string().optional(),
  YOE: z.number().optional(),
})

export type PaginationParams = z.infer<typeof paginationSchema>
export type ListUsersFilters = z.infer<typeof listUsersFiltersSchema>
export type ListJobsFilters = z.infer<typeof listJobsFiltersSchema>
export type ListCompaniesFilters = z.infer<typeof listCompaniesFiltersSchema>
export type ListApplicationsFilters = z.infer<typeof listApplicationsFiltersSchema>
export type ListCandidatesFilters = z.infer<typeof listCandidatesFiltersSchema> 