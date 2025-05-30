"use client"
import { useEffect, useState } from "react"
import { getAboutUsPageData } from "@/actions/static/aboutus"
import { AboutUsForm, AboutUsMainInput } from "./aboutus-form"
import { TeamMembersForm } from "./aboutusforms/team-members-form"
import { SpecializationsForm } from "./aboutusforms/specializations-form"
import { StatsForm } from "./aboutusforms/stats-form"
import { TabsForm } from "./aboutusforms/tabs-form"
import { WhyChooseUsCardsForm } from "./aboutusforms/why-choose-us-cards-form"
import type { AboutUsTeamMember, AboutUsSpecialization, AboutUsStat, AboutUsTab, AboutUsWhyChooseUsCard } from "@prisma/client"

interface AboutUsArrays {
  teamMembers: AboutUsTeamMember[]
  specializations: AboutUsSpecialization[]
  stats: AboutUsStat[]
  tabs: AboutUsTab[]
  whyChooseUsCards: AboutUsWhyChooseUsCard[]
}

export default function AboutUsFormWrapper() {
  const [aboutUs, setAboutUs] = useState<AboutUsMainInput | null>(null)
  const [arrays, setArrays] = useState<AboutUsArrays | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const data = await getAboutUsPageData()
        if (isMounted && data) {
          const { teamMembers, specializations, stats, tabs, whyChooseUsCards, ...mainFields } = data
          setAboutUs(mainFields)
          setArrays({ teamMembers, specializations, stats, tabs, whyChooseUsCards })
        }
      } catch {
        setError("Failed to fetch About Us data.")
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) return <div>Loading About Us data...</div>
  if (error) return <div>{error}</div>
  if (!aboutUs || !arrays) return <div>No About Us data found.</div>
  // console.log(arrays)
  return (
    <div className="space-y-8">
      <AboutUsForm initialData={aboutUs} />
      <TeamMembersForm initialTeamMembers={arrays.teamMembers} />
      <SpecializationsForm initialSpecializations={arrays.specializations} />
      <StatsForm initialStats={arrays.stats} />
      <TabsForm initialTabs={arrays.tabs} />
      <WhyChooseUsCardsForm initialWhyChooseUsCards={arrays.whyChooseUsCards} />
    </div>
  )
} 