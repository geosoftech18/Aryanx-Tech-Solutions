import { Button } from "@/components/ui/button"
import { Briefcase, Code, Palette, Megaphone, TrendingUp, DollarSign, Users, type LucideIcon } from "lucide-react"
import Link from "next/link"

interface CategoryCardProps {
  category: {
    id: string
    title: string
    count: number
    icon: string
  }
}

// Map of icon names to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  "laptop-code": Code,
  palette: Palette,
  megaphone: Megaphone,
  "trending-up": TrendingUp,
  "dollar-sign": DollarSign,
  users: Users,
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Get the icon component or default to Briefcase
  const IconComponent = iconMap[category.icon] || Briefcase

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <IconComponent className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{category.title}</h3>
          <p className="text-gray-500">{category.count} jobs available</p>
        </div>
      </div>
      <Button asChild variant="outline" className="w-full">
        <Link href={`/jobs?category=${category.id}`}>Browse Jobs</Link>
      </Button>
    </div>
  )
}
