"use client";

import * as React from "react";
import Link from "next/link";
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
} from "@tanstack/react-table";
import {
  ChevronDown,
  Flag,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../../components/ui/badge";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/services/api";
import Loading from "./loading";

// const data: Task[] = [
//   {
//     id: "8",
//     title: "Implement OAuth2 Login",
//     description:
//       "Integrate Google and GitHub social authentication using Passport.js.",
//     projectId: "3",
//     status: "in-progress",
//     priority: "high",
//     dueDate: "Tomorrow",
//     tags: ["auth", "security"],
//     subtasks: [
//       { id: "1", title: "Register OAuth apps", completed: true },
//       { id: "2", title: "Setup strategy callbacks", completed: false },
//       { id: "3", title: "Test JWT issuance", completed: false },
//     ],
//     comments: [],
//   },
//   {
//     id: "9",
//     title: "Optimize Landing Page",
//     description:
//       "Improve LCP and CLS scores to meet Core Web Vitals requirements.",
//     projectId: "1",
//     status: "todo",
//     priority: "medium",
//     dueDate: "Next Month",
//     tags: ["frontend", "performance"],
//     subtasks: [
//       { id: "1", title: "Compress hero images", completed: false },
//       { id: "2", title: "Implement lazy loading", completed: false },
//     ],
//     comments: [],
//   },
//   {
//     id: "10",
//     title: "Fix Header CSS",
//     description:
//       "Mobile menu is overlapping the logo on screens smaller than 360px.",
//     projectId: "1",
//     status: "done",
//     priority: "high",
//     dueDate: "Next Week",
//     tags: ["ui", "bug"],
//     subtasks: [{ id: "1", title: "Debug z-index issue", completed: true }],
//     comments: [],
//   },
//   {
//     id: "11",
//     title: "Write API Documentation",
//     description: "Document the v2 endpoints using Swagger/OpenAPI.",
//     projectId: "2",
//     status: "todo",
//     priority: "low",
//     dueDate: "Today",
//     tags: ["documentation"],
//     subtasks: [
//       { id: "1", title: "Define user schemas", completed: false },
//       { id: "2", title: "Export JSON spec", completed: false },
//     ],
//     comments: [],
//   },
// ];
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  tags: string[];
  subtasks: Subtask[];
  comments: unknown[];
}

export const columns: ColumnDef<Task>[] = [
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
        disabled
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Checkbox
          checked={row.getIsSelected() || status === "done"}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          disabled
        />
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      if (status === "done") {
        return (
          <div className="capitalize line-through">{row.getValue("title")}</div>
        );
      }

      return <div className="capitalize">{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      if (status === "done") {
        return (
          <Badge className="bg-green-500 text-white border-none">Done</Badge>
        );
      }

      if (status === "in-progress") {
        return (
          <Badge className="bg-amber-500 text-white border-none">
            In Progress
          </Badge>
        );
      }

      return <Badge variant="secondary">Todo</Badge>;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;

      if (priority === "high") {
        return <Flag className="text-red-500 fill-current w-3.5 h-3.5 " />;
      }

      if (priority === "medium") {
        return <Flag className="text-amber-500 fill-current w-3.5 h-3.5 " />;
      }

      return <Flag className="text-blue-500 fill-current w-3.5 h-3.5" />;
    },
  },
  {
    accessorKey: "dueDate",
    header: () => <div className="text-right">Due Date</div>,
    cell: ({ row }) => {
      const dueDate = parseFloat(row.getValue("dueDate"));
      return <div className="text-right">{row.getValue("dueDate")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const taskID = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(taskID)}>
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/tasks/${taskID}`}>View Task Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit task</DropdownMenuItem>
            <DropdownMenuItem>Delete task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    initialData: [],
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <div className="w-full flex space-x-4 justify-end">
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <Button asChild>
              <Link href="/tasks/new" className="flex items-center gap-2">
                <Plus size={16} /> New task
              </Link>
            </Button>
          </div>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
