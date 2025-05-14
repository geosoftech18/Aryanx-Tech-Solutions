"use client"

import { deleteUser } from "@/actions/admin/users/delete-user"
import { AlertModal } from "@/components/ui/alertModal"
import UserViewModal from "@/components/ui/userViewModal"
import { useDebounce } from "@/hooks/use-debounce"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { UsersHeader } from "./users-header"

import { listUsers } from "@/actions/admin/users/list-users"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserStatus, type Role, type User, type UserStatus as UserStatusType } from "@prisma/client"



// Add filter types for users
interface UsersTableFilters {
  search: string;
  role: Role | "all";
  status: UserStatusType | "all";
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
const defaultFilters: UsersTableFilters = {
  search: "",
  role: "all",
  status: "all",
  page: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
}

export function UsersTable() {
  const [users, setUsers] = useState<(User & { name: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [filters, setFilters] = useState<UsersTableFilters>(defaultFilters)
  const [open, setOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User & { name: string; status: string } | null>(null)
  const debouncedSearch = useDebounce(filters.search, 300)

  useEffect(() => {
    setLoading(true)
    listUsers({ ...filters, search: debouncedSearch, role: filters.role === "all" ? undefined : filters.role, status: filters.status === "all" ? undefined : filters.status })
      .then((res) => {
        setUsers(res.users.map((u: User) => ({
          ...u,
          name: `${u.firstname} ${u.lastname}`,
          joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "",
        })))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError("Failed to load users")
        setLoading(false)
      })
  }, [debouncedSearch, filters.role, filters.status, filters.page, filters.pageSize, filters.sortBy, filters.sortOrder, filters])

  // Modular cell actions for each user row (uses closure for state/handlers)
  const UsersTableCellActions = ({ user }: { user: User & { name: string; status: string } }) => {
    return (
      <>
        <UserViewModal user={selectedUser} open={viewOpen} onClose={() => setViewOpen(false)} />
        <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => onDelete(user.id)} loading={loading} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => { setSelectedUser(user); setViewOpen(true); }}>
              <Eye className="mr-2 h-4 w-4" />
              View User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/ADMIN/users/${user.id}`} className="flex items-center">
                <Pencil className="mr-2 h-4 w-4" />
                Edit User
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => onStatusChange(user.id, user.status !== UserStatus.ACTIVE ? UserStatus.ACTIVE : UserStatus.INACTIVE)}>
              {user.status === UserStatus.ACTIVE ? (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Deactivate
                </>
              ) : (
                <>
                  <Unlock className="mr-2 h-4 w-4" />
                  Activate
                </>
              )}
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => { setSelectedUser(user); setOpen(true); }}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }

  // Columns: use local UsersTableCellActions
  const columns: ColumnDef<User & { name: string; status: string }>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{row.getValue<string>("name").charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("name")}</span>
          <span className="text-xs text-muted-foreground">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge variant={role === "admin" ? "default" : role === "employer" ? "secondary" : "outline"}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
            variant={status === UserStatus.ACTIVE ? "default" : status === UserStatus.PENDING ? "secondary" : "destructive"}
          className={
              status === UserStatus.ACTIVE
              ? "bg-green-100 text-green-800 hover:bg-green-200"
                : status === UserStatus.PENDING
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : ""
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "joined",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("joined")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
        return <UsersTableCellActions user={user} />
    },
  },
]

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const onDelete = async (userId: string) => {
    try {
      setLoading(true)
      await deleteUser(userId)
      const res = await listUsers({ ...filters, search: debouncedSearch, role: filters.role === "all" ? undefined : filters.role, status: filters.status === "all" ? undefined : filters.status });
      setUsers(res.users.map((u: User) => ({
        ...u,
        name: `${u.firstname} ${u.lastname}`,
        joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "",
      })));
      toast.success("User deleted.")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  // const onStatusChange = async (userId: string, status: UserStatusType) => {
  //   try {
  //     setLoading(true)
  //     await changeUserStatus(userId, status);
  //     const res = await listUsers({ ...filters, search: debouncedSearch, role: filters.role === "all" ? undefined : filters.role, status: filters.status === "all" ? undefined : filters.status });
  //     setUsers(res.users.map((u: User) => ({
  //       ...u,
  //       name: `${u.firstname} ${u.lastname}`,
  //       joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "",
  //     })));
  //     toast.success(status === UserStatus.ACTIVE ? "User activated." : "User deactivated.")
  //   } catch {
  //     toast.error("Something went wrong")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  if (loading) return <div className="p-4">Loading users...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <Card>
      <div className="p-4 border-b">
        <UsersHeader
          search={filters.search}
          onSearch={(value) => setFilters((prev) => ({ ...prev, search: value, page: 1 }))}
          role={filters.role}
          onRoleChange={(value) => setFilters((prev) => ({ ...prev, role: value, page: 1 }))}
          status={filters.status}
          onStatusChange={(value) => setFilters((prev) => ({ ...prev, status: value, page: 1 }))}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}
