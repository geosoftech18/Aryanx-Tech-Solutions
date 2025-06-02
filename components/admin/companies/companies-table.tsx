"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown, Briefcase, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { deleteCompany } from "@/actions/admin/companies/delete-company"
import { CompanyWithJobs, listCompanies } from "@/actions/admin/companies/list-companies"
import { AlertModal } from "@/components/ui/alertModal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import CompanyViewModal from "@/components/ui/CompanyViewModal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDebounce } from "@/hooks/use-debounce"
import { Company } from "@prisma/client"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { CompaniesHeader } from "./companies-header"



export function CompaniesTable() {
  const [companies, setCompanies] = useState<CompanyWithJobs[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({ search: "", page: 1, pageSize: 10 })
  const debouncedSearch = useDebounce(filters.search, 300)
  const router = useRouter()

  // Fetch companies
  useEffect(() => {
    setLoading(true)
    listCompanies({ ...filters, search: debouncedSearch })
      .then((res) => {
        setCompanies(res.companies)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load companies")
        setLoading(false)
      })
  }, [debouncedSearch, filters.page, filters.pageSize,filters])

  // Handle delete
  const onDelete = async (companyId: string) => {
    try {
      setLoading(true)
      await deleteCompany(companyId)
      router.refresh()
      toast.success("Company deleted.")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  // Modular cell actions for each company row
  const CompaniesTableCellActions = ({ company }: { company: any }) => (
    <>
      <CompanyViewModal company={selectedCompany} open={viewOpen} onClose={() => setViewOpen(false)} />
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => onDelete(company.id)} loading={loading} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => { setSelectedCompany(company); setViewOpen(true); }}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/admin/companies/${company.id}`} className="flex items-center">
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={() => { setSelectedCompany(company); setOpen(true); }}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )

  // Define the columns (replace sample data columns with real fields)
  const columns: ColumnDef<CompanyWithJobs>[] = [
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
    header: "Company ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
            {/* <AvatarImage src={row.original.logo || "/placeholder.svg"} alt={row.getValue("name")} /> */}
          <AvatarFallback>{row.getValue<string>("name").charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => <div>{row.getValue("industry")}</div>,
  },
  {
      accessorKey: "sector",
      header: "Sector",
      cell: ({ row }) => <div>{row.getValue("sector")}</div>,
  },
  {
      accessorKey: "employees",
      header: "Employees",
      cell: ({ row }) => <div>{row.getValue("employees")}</div>,
  },
  {
    accessorKey: "jobs",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Jobs
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span>{row.original.jobs.length}</span>
      </div>
    ),
  },
    // {
    //   accessorKey: "joined",
    //   header: "Joined",
    //   cell: ({ row }) => <div>{row.getValue("joined")}</div>,
    // },
  {
    id: "actions",
    enableHiding: false,
      cell: ({ row }) => {
        const company = row.original
        return <CompaniesTableCellActions company={company} />
    },
  },
]

  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <Card>
      <div className="p-4 border-b">
        <CompaniesHeader
          search={filters.search}
          onSearch={value => setFilters(f => ({ ...f, search: value, page: 1 }))}
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
                  No companies found.
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
