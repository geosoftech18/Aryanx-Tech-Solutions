// components/candidate/RegularCandidate.tsx
"use client";

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
import { Gender } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { formSchema } from "./formschema";

export const WomenReturningCandidate = ({
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
            <FormLabel>Career Break *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe career break"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gender"
        render={({ }) => (
          <FormItem>
            <FormLabel>Gender *</FormLabel>
            <Select value={Gender.FEMALE}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Gender selected as female" />
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
