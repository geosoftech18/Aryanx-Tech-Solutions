"use client";

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
import { useEffect, useState } from "react";

import { deleteJob } from "@/actions/admin/jobs/delete-job";
import { listJobs } from "@/actions/admin/jobs/list-jobs";
import { AlertModal } from "@/components/ui/alertModal";
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
import JobViewModal from "@/components/ui/jobViewModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/use-debounce";
import { Application, Company, Job, JobType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { JobsHeader } from "./jobs-header";

// Define filter types
interface JobsTableFilters {
  search: string;
  status: "active" | "inactive";
  type: JobType;
  companyId: string;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const defaultFilters: JobsTableFilters = {
  search: "",
  status: "active",
  type: JobType.FULL_TIME,
  companyId: "",
  page: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

// 1. JobsTableHeader: renders the table header row
export function JobsTableHeader({
  table,
}: {
  table: any;
  columns: any[];
}) {
  return (
    <TableHeader className="light-table-header">
      {table.getHeaderGroups().map((headerGroup: any) => (
        <TableRow
          key={headerGroup.id}
          className="border-gray-200 hover:bg-gray-50"
        >
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

// 2. JobsTableCellActions: renders the cell actions (edit/delete/view)
export function JobsTableCellActions({
  job,
  onDelete,
  loading,
  open,
  setOpen,
  viewOpen,
  setViewOpen,
}: any) {
  return (
    <>
      <JobViewModal
        job={job}
        open={viewOpen}
        onClose={() => setViewOpen(false)}
      />
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(job.id)}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border-gray-200">
          <DropdownMenuLabel className="text-gray-700">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="text-gray-700 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer flex items-center"
            onClick={() => setViewOpen(true)}
          >
            <Eye className=" h-4 w-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
            <Link
              href={`/ADMIN/jobs/${job.id}`}
              className="cursor-pointer flex items-center"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-100" />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-600 hover:bg-gray-50 focus:bg-gray-50"
          >
            <Button
              variant={"destructive"}
              className="cursor-pointer flex items-center"
            >
              <Trash2 className="mr-2 h-4 w-4 text-white" />
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// 3. JobsTable: main component
export function JobsTable() {
  const [jobs, setJobs] = useState<
    (Job & { applications: Application[] } & { company: Company })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const router = useRouter();

  const onDelete = async (jobId: string) => {
    try {
      setLoading(true);

      await deleteJob(jobId);

      router.refresh();
      toast.success("Job deleted.");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobsTableFilters>(defaultFilters);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Debounce the search input
  const debouncedSearch = useDebounce(filters.search, 300);

  // Fetch jobs when filters change (debounced search)
  useEffect(() => {
    setLoading(true);
    listJobs({ ...filters, search: debouncedSearch })
      .then((res) => {
        setJobs(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load jobs");
        setLoading(false);
      });
  }, [
    debouncedSearch,
    filters.status,
    filters.type,
    filters.companyId,
    filters.page,
    filters.pageSize,
    filters.sortBy,
    filters.sortOrder,
    filters,
  ]);

  // Handle sorting
  useEffect(() => {
    if (sorting.length > 0) {
      setFilters((prev) => ({
        ...prev,
        sortBy: sorting[0].id,
        sortOrder: sorting[0].desc ? "desc" : "asc",
      }));
    }
  }, [sorting]);

  // Table columns
  const columns: ColumnDef<
    Job & { applications: Application[] } & { company: Company }
  >[] = [
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
          className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Job ID",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-gray-700 hover:text-gray-900"
          >
            Job Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => (
        <div className="text-gray-700">
          {(row.getValue("company") as Company).name}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="text-gray-700">{row.getValue("location")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-gray-700">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("isActive") as boolean;
        return (
          <Badge
            variant={status ? "default" : "destructive"}
            className={status ? "light-badge-success" : "light-badge-danger"}
          >
            {status ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "applications",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-gray-700 hover:text-gray-900"
          >
            Applications
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center text-gray-700">
          {(row.getValue("applications") as Application[]).length}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Posted",
      cell: ({ row }) => (
        <div className="text-gray-700">
          {new Date(row.getValue("createdAt") as string).toLocaleString(
            "en-US",
            {
              dateStyle: "medium",
            }
          )}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const job = row.original;
        return (
          <JobsTableCellActions
            job={job}
            onDelete={onDelete}
            loading={loading}
            open={open}
            setOpen={setOpen}
            viewOpen={viewOpen}
            setViewOpen={setViewOpen}
          />
        );
      },
    },
  ];

  // console.log(jobs);
  const table = useReactTable({
    data: jobs,
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

  if (loading) return <div className="p-4">Loading jobs...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <Card className="w-full">
      <div className="p-4 border-b">
        <JobsHeader
          search={filters.search}
          onSearch={(value) =>
            setFilters((prev) => ({ ...prev, search: value, page: 1 }))
          }
        />
      </div>
      <div className="rounded-md border border-gray-200">
        <Table className="light-table">
          <JobsTableHeader table={table} columns={columns} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-gray-200 light-table-row-hover"
                >
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
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-gray-600">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }))
            }
            disabled={filters.page === 1}
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            disabled={jobs.length < filters.pageSize}
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
