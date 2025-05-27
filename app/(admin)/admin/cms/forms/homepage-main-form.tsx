"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateHomepageMain } from "@/actions/static/homepage/update-homepage-main";
import { useState } from "react";

const homepageMainSchema = z.object({
  searchTitle: z.string().optional(),
  searchSubtitle: z.string().optional(),
  categoryTitle: z.string().optional(),
  categorySubtitle: z.string().optional(),
  partnerTitle: z.string().optional(),
  partnerSubtitle: z.string().optional(),
  statsTitle: z.string().optional(),
  statsSubtitle: z.string().optional(),
  stepsTitle: z.string().optional(),
  stepsSubtitle: z.string().optional(),
});

type HomepageMainInput = z.infer<typeof homepageMainSchema>;

export function HomepageMainForm({ initialData }: { initialData: HomepageMainInput }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<HomepageMainInput>({
    resolver: zodResolver(homepageMainSchema),
    defaultValues: initialData,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: HomepageMainInput) {
    setMessage(null);
    setError(null);
    try {
      await updateHomepageMain(values);
      setMessage("Homepage updated successfully.");
    } catch {
      setError("Failed to update homepage.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <Input {...register("searchTitle")} placeholder="Search Title" disabled={isSubmitting} />
        <Input {...register("searchSubtitle")} placeholder="Search Subtitle" disabled={isSubmitting} />
        <Input {...register("categoryTitle")} placeholder="Category Title" disabled={isSubmitting} />
        <Input {...register("categorySubtitle")} placeholder="Category Subtitle" disabled={isSubmitting} />
        <Input {...register("partnerTitle")} placeholder="Partner Title" disabled={isSubmitting} />
        <Input {...register("partnerSubtitle")} placeholder="Partner Subtitle" disabled={isSubmitting} />
        <Input {...register("statsTitle")} placeholder="Stats Title" disabled={isSubmitting} />
        <Input {...register("statsSubtitle")} placeholder="Stats Subtitle" disabled={isSubmitting} />
        <Input {...register("stepsTitle")} placeholder="Steps Title" disabled={isSubmitting} />
        <Input {...register("stepsSubtitle")} placeholder="Steps Subtitle" disabled={isSubmitting} />
      </div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update Homepage"}</Button>
      {message && <div className="text-green-600 text-sm">{message}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
} 