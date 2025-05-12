"use client";

import { createUserAdmin } from "@/actions/admin/users/create-user";
import { updateUser } from "@/actions/admin/users/update-user";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Zod schema for form validation

const userFormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  middlename: z.string().optional(),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(Role),
}) 

type UserFormValues = z.infer<typeof userFormSchema>;

export default function UserForm({
  initialData,
  userId,
}: {
  initialData: Partial<UserFormValues> | null;
  userId: string | null;
}) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData || {
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      password: "",
      role: Role.CANDIDATE,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // Handle form submission
  async function onSubmit(values: UserFormValues) {
    setLoading(true);
    try {
      if (userId && initialData) {
        // Update user
        const res = await updateUser(userId, values);
        if (res) {
          toast.success("User updated successfully");
          router.push("/ADMIN/users");
        } else {
          toast.error("Failed to update user");
        }
      } else {
        // Create user
        const res = await createUserAdmin(values);
        if (res) {
          toast.success("User created successfully");
          router.push("/ADMIN/users");
        } else {
          toast.error("Failed to create user");
        }
      }
    } catch (error) {
      toast.error("An error occurred while submitting the user");
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="First Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Middle Name */}
          <FormField
            control={form.control}
            name="middlename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Middle Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Last Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Role Combobox */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <ComboboxName
                    items={Object.values(Role).map((r) => ({ id: r, name: r }))}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Status Combobox */}
          {/* <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <ComboboxName
                    items={Object.values(UserStatus).map((s) => ({ id: s, name: s }))}
                    value={UserStatus.PENDING}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-1/2 cursor-pointer ">
            {loading
              ? "Submitting..."
              : initialData && userId
              ? "Update User"
              : "Create User"}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
} 