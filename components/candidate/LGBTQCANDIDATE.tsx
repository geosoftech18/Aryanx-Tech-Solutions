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
import { LGBTQ } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./formschema";

export const LGBTQCandidate = ({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="pwdCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LGBTQ Category *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select LGBTQ category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(LGBTQ).map((option) => (
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