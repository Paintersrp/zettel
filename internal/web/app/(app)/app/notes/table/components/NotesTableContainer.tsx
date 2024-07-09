"use client"

import { Suspense, useMemo } from "react"
import { type Table } from "@tanstack/react-table"

import { useTable } from "@/hooks/useTable"
import DataTable from "@/components/ui/data-tables/DataTable"
import DataTableSkeleton from "@/components/ui/data-tables/DataTableSkeleton"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"
import { useAuth } from "@/components/auth/provider"
import { useGetNotes } from "@/app/(app)/lib/getNotes"

import { useMemoizedNotesColumns } from "./NotesColumns"
import { NotesTableToolbar } from "./NotesTableToolbar"
import { NotesTableToolbarSkeleton } from "./NotesTableToolbarSkeleton"

interface NotesTableProps {
  filter: string
}

const NotesTableContainer = ({ filter }: NotesTableProps) => {
  const { user } = useAuth()
  const columns = useMemoizedNotesColumns()

  if (!user || !user.active_vault) {
    return null
  }

  const notesQuery = useGetNotes({
    key: "table",
    id: user.active_vault.id,
    page: 0,
    max: 0, // retrieve all
    filter,
  })

  const defaultData = useMemo(() => [], [])
  const table = useTable({
    data: notesQuery.data?.notes ?? defaultData,
    columns,
    rowCount: notesQuery.data?.count ?? 0,
  })

  return (
    <>
      <div className="px-4">
        {notesQuery.isLoading || notesQuery.isRefetching ? (
          <NotesTableToolbarSkeleton />
        ) : (
          <NotesTableToolbar table={table} />
        )}
      </div>
      <Separator className="mt-4 mb-2" />
      <Suspense fallback={<DataTableSkeleton />}>
        <ScrollArea id="table-view" className="h-[calc(100vh-12rem)] flex-grow">
          <div className="px-4 py-2">
            {notesQuery.isLoading || notesQuery.isRefetching ? (
              <DataTableSkeleton />
            ) : (
              <DataTable table={table as Table<unknown>} />
            )}
          </div>
        </ScrollArea>
      </Suspense>
    </>
  )
}

export default NotesTableContainer
