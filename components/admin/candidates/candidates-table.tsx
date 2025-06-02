"use client";

import { deleteCandidate } from "@/actions/admin/candidates/delete-candidate";
import { CandidateWithUser, listCandidates } from "@/actions/admin/candidates/list-candidates";
import { AlertModal } from "@/components/ui/alertModal";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDebounce } from "@/hooks/use-debounce";
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
import toast from "react-hot-toast";
import { CandidatesHeader } from "./candidates-header";
import CandidateViewModal from "./CandidateViewModal";

// Table filters type
interface CandidatesTableFilters {
  search: string;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const defaultFilters: CandidatesTableFilters = {
  search: "",
  page: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export function CandidatesTable() {
  const [candidates, setCandidates] = useState<CandidateWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CandidatesTableFilters>(defaultFilters);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateWithUser | null>(null);
  const debouncedSearch = useDebounce(filters.search, 300);
  // const router = useRouter();

  // Fetch candidates when filters change
  useEffect(() => {
    setLoading(true);
    // Ensure sortBy is a valid key of Candidate or 'name'
    const validSortBy =
      filters.sortBy && [
        "createdAt", "name", "id", "userId", "candidateType", "contact", "YOE", "skills", "Bio", "DOB", "resume", "gender", "LGBTQ", "employmentBreak", "pwdCategory", "updatedAt"
      ].includes(filters.sortBy)
        ? (filters.sortBy as any)
        : "createdAt";
    listCandidates({ ...filters, search: debouncedSearch, sortBy: validSortBy })
      .then((res) => {
        setCandidates(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load candidates");
        setLoading(false);
      });
  }, [debouncedSearch, filters.page, filters.pageSize, filters.sortBy, filters.sortOrder,filters.search,filters]);

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

  // Delete candidate handler
  const onDelete = async (candidateId: string) => {
    try {
      setLoading(true);
      await deleteCandidate(candidateId);
      setCandidates(candidates.filter((candidate) => candidate.id !== candidateId));
      toast.success("Candidate deleted.");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // Table columns
  const columns: ColumnDef<CandidateWithUser>[] = [
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
      accessorKey: "user.firstname",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Name<ArrowUpDown className="ml-2 h-4 w-4" /></Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.original.user.firstname} {row.original.user.lastname}</div>
      ),
    },
    {
      accessorKey: "user.email",
      header: "Email",
      cell: ({ row }) => <div className="text-gray-700">{row.original.user.email}</div>,
    },
    {
      accessorKey: "candidateType",
      header: "Type",
      cell: ({ row }) => <div className="text-gray-700">{row.original.candidateType}</div>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => <div className="text-gray-700">{row.original.gender}</div>,
    },
    {
      accessorKey: "YOE",
      header: "YOE",
      cell: ({ row }) => <div className="text-gray-700">{row.original.YOE}</div>,
    },
    {
      accessorKey: "skills",
      header: "Skills",
      cell: ({ row }) => <div className="text-gray-700">{row.original.skills.join(", ")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => <div className="text-gray-700">{new Date(row.original.createdAt).toLocaleDateString()}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const candidate = row.original;
        return (
          <div className="flex items-center gap-2">
            <CandidateViewModal candidate={selectedCandidate} open={viewOpen} onClose={() => setViewOpen(false)} />
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => onDelete(candidate.id)} loading={loading} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-200">
                <DropdownMenuLabel className="text-gray-700">Actions</DropdownMenuLabel>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer flex items-center" onClick={() => { setSelectedCandidate(candidate); setViewOpen(true); }}>
                  <Eye className="h-4 w-4" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                  <Link href={`/admin/candidates/${candidate.id}`} className="cursor-pointer flex items-center">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem onClick={() => setOpen(true)} className="text-red-600 hover:bg-gray-50 focus:bg-gray-50">
                  <Button variant={"destructive"} className="cursor-pointer flex items-center">
                    <Trash2 className="mr-2 h-4 w-4 text-white" />
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: candidates,
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

  if (loading) return <div className="p-4">Loading candidates...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <Card className="w-full">
      <div className="p-4 border-b">
        <CandidatesHeader
          search={filters.search}
          onSearch={(value) => setFilters((prev) => ({ ...prev, search: value, page: 1 }))}
        />
      </div>
      <div className="rounded-md border border-gray-200">
        <Table className="light-table">
          <TableHeader className="light-table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-200 hover:bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-gray-700">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="border-gray-200 light-table-row-hover">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-700">
                  No candidates found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-gray-600">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }))}
            disabled={filters.page === 1}
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            disabled={candidates.length < filters.pageSize}
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
} 