"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ComboboxName } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { listCandidatesForCombobox } from "@/actions/admin/applications/list-candidates";
import { listJobsForCombobox } from "@/actions/admin/jobs/list-jobs-for-combobox";
import { createApplicationAdmin } from "@/actions/admin/applications/create-application";
import toast from "react-hot-toast";
import { updateApplicationAdmin } from "@/actions/admin/applications/update-application";
import { useRouter } from "next/navigation";

// Zod schema for form validation
const applicationFormSchema = z.object({
  candidateId: z.string().min(1, "Candidate is required"),
  jobId: z.string().min(1, "Job is required"),
  coverLetter: z
    .string()
    .min(10, "Cover letter must be at least 10 characters"),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

/**
 * ApplicationForm component for admin to create a new application.
 * Uses shadcn/ui combobox for candidate and job selection, textarea for cover letter, and Zod for validation.
 */
export default function ApplicationForm({
  initialData,
  applicationId,
}: {
  initialData: ApplicationFormValues | null;
  applicationId: string | null;
}) {
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: initialData || {
      candidateId: "",
      jobId: "",
      coverLetter: "",
    },
  });

  const [candidates, setCandidates] = useState<{ id: string; name: string }[]>(
    []
  );
  const [jobs, setJobs] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Fetch candidates and jobs for comboboxes
  useEffect(() => {
    async function fetchOptions() {
      try {
        setLoading(true);
        const [candidateOptions, jobOptions] = await Promise.all([
          listCandidatesForCombobox(),
          listJobsForCombobox(),
        ]);
        setCandidates(
          candidateOptions.map((c) => ({ id: c.value, name: c.label }))
        );
        setJobs(jobOptions.map((j) => ({ id: j.value, name: j.label })));
      } catch (err) {
        console.log(err)
        toast.error("Failed to load options");
      } finally {
        setLoading(false);
      }
    }
    fetchOptions();
  }, []);

  // Handle form submission
  async function onSubmit(values: ApplicationFormValues) {
    setLoading(true);

    try {
      if (initialData && applicationId) {
        //   create an update application function and call it here
        const res = await updateApplicationAdmin({ ...values, applicationId });
        if (res.success) {
          toast.success("Application updated successfully");
          form.reset();
          router.push("/admin/applications");
        } else {
          toast.error(res.error || "Failed to update application");
        }
      } else {
        const res = await createApplicationAdmin(values);
        if (res.success) {
          toast.success("Application created successfully");
          form.reset();
          router.push("/admin/applications");
        } else {
          toast.error(res.error || "Failed to create application");
        }
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting the application");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Candidate Combobox */}
          <FormField
            control={form.control}
            name="candidateId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Candidate</FormLabel>
                <FormControl>
                  <ComboboxName
                    items={candidates}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Combobox */}
          <FormField
            control={form.control}
            name="jobId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job</FormLabel>
                <FormControl>
                  <ComboboxName
                    items={jobs}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Letter */}
          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    placeholder="Write a cover letter..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error/Success Messages
          {error && <div className="text-destructive text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">Application created successfully!</div>} */}

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-1/2 cursor-pointer ">
            {loading
              ? "Submitting..."
              : initialData && applicationId
              ? "Update Application"
              : "Create Application"}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
