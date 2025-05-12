"use client";

import { createCompanyAdmin } from "@/actions/admin/companies/create-company";
import { listCompanies } from "@/actions/admin/companies/list-companies";
import { updateCompany } from "@/actions/admin/companies/update-company";
import { listUsers } from "@/actions/admin/users/list-users";
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
import { Industry, Prisma, Role, Sector } from "@prisma/client";
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
  companyId,
}: {
  initialData: Partial<CompanyFormValues> | null;
  companyId: string | null;
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
      user: { connect: { id: "" } },
    },
  });

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<{ id: string; name: string; email: string }[]>([]);
  const [usersLoading, setUsersLoading] = React.useState(false);
  const [usersError, setUsersError] = React.useState<string | null>(null);

  // Fetch employer users for combobox
  React.useEffect(() => {
    async function fetchUsers() {
      setUsersLoading(true);
      setUsersError(null);
      try {
        // Fetch all companies to get userIds that already have a company
        const companiesRes = await listCompanies();
        const companyUserIds = new Set((companiesRes.companies || []).map((c) => c.userId));
        // Fetch all users
        const res = await listUsers({ page: 1, pageSize: 100 });
        if (res && res.users) {
          setUsers(
            res.users
              .filter((u) => u.role === Role.EMPLOYER && !companyUserIds.has(u.id))
              .map((u) => ({ id: u.id, name: `${u.firstname} ${u.lastname}`, email: u.email }))
          );
        } else {
          setUsersError("No employer users found");
        }
      } catch {
        setUsersError("Failed to load users");
      } finally {
        setUsersLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function onSubmit(values: CompanyFormValues) {
    setLoading(true);
    try {
      if (companyId && initialData) {
        // Update company
        const res = await updateCompany(companyId, values);
        if (res) {
          toast.success("Company updated successfully");
          router.push("/ADMIN/companies");
        } else {
          toast.error("Failed to update company");
        }
      } else {
        // Create company
        const res = await createCompanyAdmin(values);
        if (res) {
          toast.success("Company created successfully");
          router.push("/ADMIN/companies");
        } else {
          toast.error("Failed to create company");
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred while submitting the company");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* User (Owner) Combobox - only show on create */}
          {!initialData && (
            <FormField
              control={form.control}
              name="user.connect.id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner (Employer User)</FormLabel>
                  <FormControl>
                    <ComboboxName
                      items={users.map((u) => ({ id: u.id, name: `${u.name} (${u.email})` }))}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                  {usersLoading && <div className="text-xs text-muted-foreground">Loading users...</div>}
                  {usersError && <div className="text-destructive text-xs mt-1">{usersError}</div>}
                  {users.length === 0 && !usersLoading && (
                    <div className="text-xs text-yellow-600 mt-1">
                      No eligible employers found. Please create a user with the EMPLOYER role who is not already linked to a company, then try again.
                    </div>
                  )}
                </FormItem>
              )}
            />
          )}
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
                  <Input {...field} placeholder="Number of employees (optional)" />
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
                    items={Object.values(Industry).map((i) => ({ id: i, name: i }))}
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
                    items={Object.values(Sector).map((s) => ({ id: s, name: s }))}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-1/2 cursor-pointer ">
            {loading
              ? "Submitting..."
              : initialData && companyId
              ? "Update Company"
              : "Create Company"}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
} 