import { SettingsHeader } from "@/components/admin/settings/settings-header"
import { SettingsForm } from "@/components/admin/settings/settings-form"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SettingsHeader />
      <SettingsForm />
    </div>
  )
}
