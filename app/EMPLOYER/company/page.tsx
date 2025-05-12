"use client"

import { getCompanyByUserId } from "@/actions/company-actions/get-company"
import { updateCompany } from "@/actions/company-actions/update-company"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Company, Industry, Sector } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type FormData = {
  name: string
  description: string
  logo: string
  website: string
  employees: string
  industry: Industry
  sector: Sector
}

export default function CompanyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    logo: "",
    website: "",
    employees: "",
    industry: Industry.TECHNOLOGY,
    sector: Sector.PRIVATE,
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated" && session?.user?.id) {
      loadCompany(session.user.id)
    }
  }, [status, session, router])

  const loadCompany = async (userId: string) => {
    try {
      const companyData = await getCompanyByUserId(userId)
      setCompany(companyData)
      setFormData({
        name: companyData.name,
        description: companyData.description,
        logo: companyData.logo || "",
        website: companyData.website || "",
        employees: companyData.employees || "",
        industry: companyData.industry,
        sector: companyData.sector,
      })
    } catch (error) {
      // If company doesn't exist, we'll show the create form
      setCompany(null)
      console.error("Error loading company:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) {
      toast.error("Please sign in to continue")
      return
    }

    if (!company) {
      // Create new company
      setIsCreating(true)
      try {
        toast.success("Company profile created successfully")
      } catch (error) {
        console.error("Error creating company:", error)
        toast.error("Failed to create company profile")
      } finally {
        setIsCreating(false)
      }
    } else {
      // Update existing company
      try {
        const response = await updateCompany(session.user.id, formData)
        setCompany(response.data)
        setIsEditing(false)
        toast.success("Company details updated successfully")
      } catch (error) {
        console.error("Error updating company:", error)
        toast.error("Failed to update company details")
      }
    }
  }

  const isFormDisabled = (): boolean => {
    return Boolean(company && !isEditing)
  }

  const renderSelect = (
    value: string,
    onValueChange: (value: string) => void,
    options: string[],
    placeholder: string
  ) => (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={isFormDisabled()}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option.replace(/_/g, " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{company ? "Company Profile" : "Create Company Profile"}</CardTitle>
              <CardDescription>
                {company ? "Manage your company details and information" : "Set up your company profile to start posting jobs"}
              </CardDescription>
            </div>
            {company && (
              <Button
                variant={isEditing ? "destructive" : "default"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isFormDisabled()}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  disabled={isFormDisabled()}
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                {renderSelect(
                  formData.industry,
                  (value) => handleSelectChange("industry", value),
                  Object.values(Industry),
                  "Select industry"
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                {renderSelect(
                  formData.sector,
                  (value) => handleSelectChange("sector", value),
                  Object.values(Sector),
                  "Select sector"
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  name="employees"
                  value={formData.employees}
                  onChange={handleInputChange}
                  disabled={isFormDisabled()}
                  placeholder="e.g., 50-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  disabled={isFormDisabled()}
                  type="url"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={isFormDisabled()}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isCreating||!isEditing}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : company ? (
                  "Save Changes" 
                ) : (
                  "Create Company Profile"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 