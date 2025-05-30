"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { updateAboutUsMain } from "@/actions/static/aboutus/update-aboutus-main"
import { useState } from "react"

// Zod schema for AboutUs main fields (excluding arrays)
const aboutUsMainSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  heroTitle: z.string().min(1),
  heroSubtitle: z.string().min(1),
  heroImage: z.string().min(1),
  missionTitle: z.string().min(1),
  missionText: z.string().min(1),
  approachTitle: z.string().min(1),
  approachText: z.string().min(1),
  promiseTitle: z.string().min(1),
  promiseText: z.string().min(1),
  storyTitle: z.string().min(1),
  storyText: z.string().min(1),
  teamTitle: z.string().min(1),
  teamSubtitle: z.string().min(1),
  visionTitle: z.string().min(1),
  visionText: z.string().min(1),
  missionSectionTitle: z.string().min(1),
  missionSectionText: z.string().min(1),
  whyChooseUsTitle: z.string().min(1),
  whyChooseUsSubtitle: z.string().min(1),
  deibTitle: z.string().min(1),
  deibSubtitle: z.string().min(1),
  ctaTitle: z.string().min(1),
  ctaSubtitle: z.string().min(1),
  ctaButton1Text: z.string().min(1),
  ctaButton2Text: z.string().min(1),
})

export type AboutUsMainInput = z.infer<typeof aboutUsMainSchema>

export function AboutUsForm({ initialData }: { initialData: AboutUsMainInput }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<AboutUsMainInput>({
    resolver: zodResolver(aboutUsMainSchema),
    defaultValues: initialData,
  })
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(values: AboutUsMainInput) {
    setMessage(null)
    setError(null)
    try {
      await updateAboutUsMain(values)
      setMessage("About Us content updated successfully.")
    } catch {
      setError("Failed to update About Us content.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <Input {...register("companyName")} placeholder="Company Name" disabled={isSubmitting} />
        <Input {...register("heroTitle")} placeholder="Hero Title" disabled={isSubmitting} />
        <Input {...register("heroSubtitle")} placeholder="Hero Subtitle" disabled={isSubmitting} />
        <Input {...register("heroImage")} placeholder="Hero Image URL" disabled={isSubmitting} />
        <Input {...register("missionTitle")} placeholder="Mission Title" disabled={isSubmitting} />
        <Textarea {...register("missionText")} placeholder="Mission Text" disabled={isSubmitting} />
        <Input {...register("approachTitle")} placeholder="Approach Title" disabled={isSubmitting} />
        <Textarea {...register("approachText")} placeholder="Approach Text" disabled={isSubmitting} />
        <Input {...register("promiseTitle")} placeholder="Promise Title" disabled={isSubmitting} />
        <Textarea {...register("promiseText")} placeholder="Promise Text" disabled={isSubmitting} />
        <Input {...register("storyTitle")} placeholder="Story Title" disabled={isSubmitting} />
        <Input {...register("storyText")} placeholder="Story Text" disabled={isSubmitting} />
        <Input {...register("teamTitle")} placeholder="Team Title" disabled={isSubmitting} />
        <Textarea {...register("teamSubtitle")} placeholder="Team Subtitle" disabled={isSubmitting} />
        <Input {...register("visionTitle")} placeholder="Vision Title" disabled={isSubmitting} />
        <Textarea {...register("visionText")} placeholder="Vision Text" disabled={isSubmitting} />
        <Input {...register("missionSectionTitle")} placeholder="Mission Section Title" disabled={isSubmitting} />
        <Textarea {...register("missionSectionText")} placeholder="Mission Section Text" disabled={isSubmitting} />
        <Input {...register("whyChooseUsTitle")} placeholder="Why Choose Us Title" disabled={isSubmitting} />
        <Textarea {...register("whyChooseUsSubtitle")} placeholder="Why Choose Us Subtitle" disabled={isSubmitting} />
        <Input {...register("deibTitle")} placeholder="DEIB Title" disabled={isSubmitting} />
        <Textarea {...register("deibSubtitle")} placeholder="DEIB Subtitle" disabled={isSubmitting} />
        <Input {...register("ctaTitle")} placeholder="CTA Title" disabled={isSubmitting} />
        <Textarea {...register("ctaSubtitle")} placeholder="CTA Subtitle" disabled={isSubmitting} />
        <Input {...register("ctaButton1Text")} placeholder="CTA Button 1 Text" disabled={isSubmitting} />
        <Input {...register("ctaButton2Text")} placeholder="CTA Button 2 Text" disabled={isSubmitting} />
      </div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update About Us"}</Button>
      {message && <div className="text-green-600 text-sm">{message}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  )
} 