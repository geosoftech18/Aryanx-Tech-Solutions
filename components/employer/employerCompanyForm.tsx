"use client";
import { createCompanyForEmployer } from "@/actions/company-actions/create-company";
import { updateCompany } from "@/actions/company-actions/update-company";
import { Button } from "@/components/ui/button";
import { ComboboxName } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Industry, Prisma, Sector } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const companyFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description is required"),
  logo: z.string().optional(),
  website: z.string().optional(),
  employees: z.string().optional(),
  industry: z.nativeEnum(Industry),
  sector: z.nativeEnum(Sector),
  user: z.object({
    connect: z.object({
      id: z.string(),
    }),
  }),
}) satisfies z.ZodType<Prisma.CompanyCreateInput>;

type CompanyFormValues = z.infer<typeof companyFormSchema>;

export default function CompanyForm({
  initialData,
  userId,
}: {
  initialData: Partial<CompanyFormValues> | null;
  userId: string;
}) {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      logo: "",
      website: "",
      employees: "",
      industry: Industry.TECHNOLOGY,
      sector: Sector.PRIVATE,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(values: CompanyFormValues) {
    setLoading(true);
    try {
      if (initialData && userId) {
        // Update company
        const res = await updateCompany(userId, values);
        if (res) {
          toast.success("Company updated successfully");
          router.push("/employer");
        } else {
          toast.error("Failed to update company");
        }
      } else {
        // Create company
        console.log(values, "values");
        const res = await createCompanyForEmployer(userId, values);
        if (res) {
          toast.success("Company created successfully");
          router.push("/employer");
        } else {
          toast.error("Failed to create company");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while submitting the company");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      {!initialData ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Complete your company information</h1>
          <p className="text-sm text-muted-foreground">
            This will help us verify your company and create a profile for you
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Update your company information</h1>
          <p className="text-sm text-muted-foreground">
            This will help us verify your company and update your profile
          </p>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* User (Owner) Combobox - only show on create */}

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Company Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Company Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Logo */}
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Logo URL (optional)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Website (optional)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Employees */}
          <FormField
            control={form.control}
            name="employees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employees</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Number of employees (optional)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Industry Combobox */}
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <ComboboxName
                    items={Object.values(Industry).map((i) => ({
                      id: i,
                      name: i,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Sector Combobox */}
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sector</FormLabel>
                <FormControl>
                  <ComboboxName
                    items={Object.values(Sector).map((s) => ({
                      id: s,
                      name: s,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-1/2 cursor-pointer "
          >
            {loading
              ? "Submitting..."
              : initialData && userId
              ? "Update Company"
              : "Create Company"}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
