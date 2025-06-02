"use client";

import { createJob, updateJob } from "@/actions/employer/create-job";
import InputTags from "@/components/inputTags";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CandidateType, EmploymentType, Job, JobCategory, WorkMode } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

// Define form values type that matches the Prisma schema
type JobFormValues = Pick<
  Job,
  | "title"
  | "description"
  | "location"
  | "type"
  | "category"
  | "salary"
  | "deadline"
  | "experience"
  | "skills"
  | "isFeatured"
  | "isActive"
  | "workMode"
  | "jobFor"
>;
// Define schema that matches the form values type exactly
const jobFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.array(z.string()).min(1, "Location must be at least 1 characters"),
  type: z.nativeEnum(EmploymentType),
  workMode: z.nativeEnum(WorkMode),
  category: z.nativeEnum(JobCategory),
  salary: z.number().nullable(),
  deadline: z.date(),
  experience: z.string().nullable(),
  skills: z.array(z.string()).min(1, "Skills are required"),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  jobFor: z.array(z.nativeEnum(CandidateType)),
}) satisfies z.ZodType<JobFormValues>;

export default function JobForm({
  initialData,
  companyId,
  jobId,
}: {
  initialData: JobFormValues | null;
  companyId: string;
  jobId: string | null;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      location: [],
      type: EmploymentType.FULL_TIME,
      workMode: WorkMode.REMOTE,
      category: JobCategory.SOFTWARE_DEVELOPMENT,
      salary: null,
      deadline: new Date(),
      experience: "",
      skills: [],
      isFeatured: false,
      isActive: true,
      jobFor: [],   
    },
  });

  async function onSubmit(data: JobFormValues) {
    console.log(data, "data");
    setIsSubmitting(true);
    try {
      if (jobId) {
        const result = await updateJob(jobId, data);
        if (result.success) {
          toast.success("Job updated successfully");
          router.push("/employer/jobs");
        } else {
          toast.error(result.error || "Failed to update job");
        }
      } else {
        const result = await createJob({
          ...data,
          company: { connect: { id: companyId } },
        });
        if (result.success) {
          toast.success("Job created successfully");
          router.push("/employer/jobs");
        } else {
          toast.error(result.error || "Failed to create job");
        }
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      toast.error("An error occurred while submitting the job");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>
            {jobId ? "Edit Job Posting" : "Create Job Posting"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senior Software Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter job description..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <InputTags
                          value={Array.isArray(field.value) ? field.value : []}
                          onChange={field.onChange}
                          placeholder="Add a location and press Enter or comma"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(EmploymentType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(JobCategory).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter salary"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Application Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 2-4 years"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Skills *</FormLabel>
                      <FormControl>
                        <InputTags
                          value={Array.isArray(field.value) ? field.value : []}
                          onChange={field.onChange}
                          placeholder="Add a skill and press Enter or comma"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job For (CandidateType) Multi-Select as Checkbox Group */}
                <FormField
                  control={form.control}
                  name="jobFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job For (Candidate Type)</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-3">
                          {Object.values(CandidateType).map((type) => (
                            <label key={type} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={field.value.includes(type)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([...field.value, type]);
                                  } else {
                                    field.onChange(field.value.filter((t: string) => t !== type));
                                  }
                                }}
                              />
                              <span>{type.replace(/_/g, " ")}</span>
                            </label>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {jobId ? "Updating..." : "Creating..."}
                  </>
                ) : jobId ? (
                  "Update Job"
                ) : (
                  "Create Job"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
