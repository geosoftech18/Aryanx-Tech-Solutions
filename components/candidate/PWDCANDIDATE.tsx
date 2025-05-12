// components/candidate/RegularCandidate.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "./formschema";
import * as z from "zod";
import { Gender, PwdCategory } from "@prisma/client";

export const PWDCandidate = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="pwdCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PWD Category *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value as PwdCategory}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select disability category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(PwdCategory).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
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
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(Gender).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
