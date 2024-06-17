import React, { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { PlusCircle } from "lucide-react"

import { vaultQuery } from "@/lib/queries/vault"
import { Button } from "@/components/ui/Button"
import { DataTable } from "@/components/ui/data-tables/DataTable"
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"
import { Loading } from "@/components/Loading"

import { notesTableRoute } from "."
import { NotesColumns } from "./NotesColumns"

interface NotesTableProps {}

const NotesTable: React.FC<NotesTableProps> = () => {
  const navigate = notesTableRoute.useNavigate()
  const search = notesTableRoute.useSearch()
  const context = notesTableRoute.useRouteContext()

  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const { data: res, isLoading } = useQuery({
    queryFn: async () =>
      vaultQuery(context.user!.active_vault!.id!, 0, 0, search.filter),
    queryKey: ["notes", "table"],
    placeholderData: keepPreviousData,
  })

  const defaultData = React.useMemo(() => [], [])
  const table = useReactTable({
    data: res?.data.notes ?? defaultData,
    columns: NotesColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    rowCount: res?.data.count ?? 0,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center w-full">
        <Heading title="Notes Table" description="Manage notes for vault" />
        <Button size="xs" onClick={() => navigate({ to: "/" })}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable filterKey="tags" table={table} />
    </div>
  )
}

export default NotesTable
