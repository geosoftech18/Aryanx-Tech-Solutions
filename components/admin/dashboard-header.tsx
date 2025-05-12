import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      <div className="flex items-center gap-2">
        {/* <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="light-input w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
          />
        </div> */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </div>
  )
}
