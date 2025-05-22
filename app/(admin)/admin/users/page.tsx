import { UsersTable } from "@/components/admin/users/users-table"

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* <UsersHeader /> */}
      <UsersTable />
    </div>
  )
}
