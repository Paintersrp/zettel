import { lazy, Suspense, useMemo } from "react"
import { type Table } from "@tanstack/react-table"

import { useTable } from "@/hooks/useTable"

import { DataTableSkeleton } from "@/components/ui/data-tables/DataTableSkeleton"
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"
import { Loading } from "@/components/Loading"
import { useGetNotes } from "@/features/app/notes-table/api/getNotes"
import { useMemoizedNotesColumns } from "@/features/app/notes-table/components/NotesColumns"
import { NotesTableToolbarSkeleton } from "@/features/app/notes-table/components/NotesTableToolbarSkeleton"
import { useAuth } from "@/features/auth/providers"

import { notesTableRoute } from "."

const ScrollArea = lazy(() =>
  import("@/components/ui/ScrollArea").then((module) => ({
    default: module.ScrollArea,
  }))
)

const DataTable = lazy(() =>
  import("@/components/ui/data-tables/DataTable").then((module) => ({
    default: module.DataTable,
  }))
)

const NotesTableToolbar = lazy(() =>
  import("@/features/app/notes-table/components/NotesTableToolbar").then(
    (module) => ({ default: module.NotesTableToolbar })
  )
)

// 91kb 2024-07-03
// 68.9kb 2024-07-04

const NotesTable = () => {
  const { user } = useAuth()
  const search = notesTableRoute.useSearch()
  const columns = useMemoizedNotesColumns()

  if (!user || !user.active_vault) {
    return null
  }

  const notesQuery = useGetNotes({
    key: "table",
    id: user.active_vault.id,
    page: 0,
    max: 0, // retrieve all
    filter: search.filter,
  })

  const defaultData = useMemo(() => [], [])
  const table = useTable({
    data: notesQuery.data?.notes ?? defaultData,
    columns,
    rowCount: notesQuery.data?.count ?? 0,
  })

  if (notesQuery.isLoading || notesQuery.isRefetching) {
    return <Loading />
  }

  return (
    <div className="w-full flex-grow">
      <div className="space-y-2 px-4 py-2">
        <Heading title="Notes Table" description="Manage notes for vault" />

        <Suspense fallback={<NotesTableToolbarSkeleton />}>
          <NotesTableToolbar table={table} />
        </Suspense>
      </div>
      <Separator className="my-2" />

      <div className="w-full flex flex-col">
        <Suspense fallback={<DataTableSkeleton />}>
          <ScrollArea
            id="table-view"
            className="h-[calc(100vh-12rem)] flex-grow"
          >
            <div className="px-4 py-2">
              <DataTable table={table as Table<unknown>} />
            </div>
          </ScrollArea>
        </Suspense>
      </div>
    </div>
  )
}

export default NotesTable
