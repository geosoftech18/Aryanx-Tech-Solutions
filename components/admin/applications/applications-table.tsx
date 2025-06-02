"use client";

import { listApplications } from "@/actions/admin/applications/list-applications";
import { deleteApplication } from "@/actions/admin/applications/delete-application";
import { AlertModal } from "@/components/ui/alertModal";
import ApplicationViewModal from "@/components/ui/ApplicationModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Application,
  ApplicationStatus,
  Candidate,
  Company,
  Job,
  User
} from "@prisma/client";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ApplicationsHeader } from "./applications-header";

// Define the row type for the table
interface ApplicationRow {
  id: string;
  name: string;
  position: string;
  company: string;
  date: string;
  status: ApplicationStatus;
  avatar: string | null;
  coverLetter?: string;
}

// 1. ApplicationsTableHeader: renders the table header row
export function ApplicationsTableHeader({
  table,
}: {
  table: any;
  columns: any[];
}) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup: any) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => (
            <TableHead key={header.id} className="text-gray-700">
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

// 2. ApplicationsTableCellActions: renders the cell actions (edit/delete/view)
export function ApplicationsTableCellActions({
  fullApplication,
  onDelete,
  loading,
  open,
  setOpen,
}: any) {
  const [viewOpen, setViewOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // When opening the modal, close the dropdown
  const handleView = () => {
    setDropdownOpen(false);
    setViewOpen(true);
  };

  // When closing the modal, allow dropdown to be opened again
  const handleCloseModal = () => {
    setViewOpen(false);
  };

  return (
    <>
      <ApplicationViewModal
        FullApplication={fullApplication}
        open={viewOpen}
        onClose={handleCloseModal}
      />
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(fullApplication.id)}
        loading={loading}
      />
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleView}>
            <Eye className="mr-2 h-4 w-4" />
            View Application
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/admin/applications/${fullApplication.id}`}
              className="cursor-pointer flex items-center"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Application
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Application
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// 4. ApplicationsTable: main component
export function ApplicationsTable() {
  const [fullApplications, setFullApplications] = useState<
    (Application & {
      candidate: (Candidate & { user: User }) | null;
      job: (Job & { company: Company }) | null;
    })[]
  >([]);
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filters, ] = useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 10,
  });
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "">("");

  // Debounce the search input
  const debouncedSearch = useDebounce(search, 1000);

  // Fetch applications when filters change (debounced search)
  useEffect(() => {
    setLoading(true);
    listApplications({
      ...filters,
      search: debouncedSearch,
      status: (status as ApplicationStatus) || undefined,
    })
      .then((res) => {
        setFullApplications(res.applications);
        setApplications(
          res.applications.map((a: any) => ({
            id: a.id,
            name:
              a.candidate?.user?.firstname +
                " " +
                a.candidate?.user?.lastname || "-",
            position: a.job?.title || "-",
            company: a.job?.company?.name || "-",
            date: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "",
            status: a.status,
            avatar: a.candidate?.avatar || null,
            coverLetter: a.coverLetter,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load applications");
        setLoading(false);
      });
  }, [debouncedSearch, status, filters.page, filters.pageSize ,filters]);

  // Table columns (use ApplicationsTableCellActions for actions)
const columns: ColumnDef<ApplicationRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    header: "Application ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
  },
  {
    accessorKey: "name",
    header: "Candidate Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role Name - Company Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className="text-xs">
            {row.original.position} at {row.original.company}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Applied On",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "approved"
              ? "default"
              : status === "pending"
              ? "outline"
              : status === "reviewing"
              ? "secondary"
              : "destructive"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const application = row.original;
      return (
          <ApplicationsTableCellActions
            fullApplication={fullApplications.find((a) => a.id === application.id)}
            onDelete={async (id: string) => {
              setDeleteLoading(true);
              setDeleteError(null);
              try {
                await deleteApplication(id);
                // Refresh applications list
                const res = await listApplications({
                  ...filters,
                  search: debouncedSearch,
                  status: (status as ApplicationStatus) || undefined,
                });
                setFullApplications(res.applications);
        setApplications(
          res.applications.map((a: any) => ({
            id: a.id,
                    name:
                      a.candidate?.user?.firstname +
                        " " +
                        a.candidate?.user?.lastname || "-",
            position: a.job?.title || "-",
            company: a.job?.company?.name || "-",
            date: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "",
                    status: a.status,
            avatar: a.candidate?.avatar || null,
                    coverLetter: a.coverLetter,
                  }))
                );
                setDeletingId(null);
                setOpen(false);
              } catch (err: any) {
                setDeleteError(err.message || "Failed to delete application");
              } finally {
                setDeleteLoading(false);
              }
            }}
            loading={deleteLoading && deletingId === application.id}
            open={deletingId === application.id && open}
            setOpen={(val: boolean) => {
              setOpen(val);
              setDeletingId(val ? application.id : null);
            }}
          />
        );
      },
    },
  ];

  // ... table setup ...
  const table = useReactTable({
    data: applications,
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
  });

  if (loading) return <div className="p-4">Loading applications...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (deleteError) return <div className="p-4 text-red-600">{deleteError}</div>;

  return (
    <Card className="w-full">
      <div className="p-4 border-b">
        {/* Header will be rendered in page.tsx */}
        <ApplicationsHeader
          search={search}
          status={status}
          onSearch={setSearch}
          onStatusChange={setStatus}
        />
      </div>
      <div className="rounded-md border border-gray-200">
        <Table>
          <ApplicationsTableHeader table={table} columns={columns} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-700"
                >
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
