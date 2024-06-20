import React, { useMemo } from "react"
import { Link } from "@tanstack/react-router"
import { PlusCircle } from "lucide-react"

import { useVaultQuery } from "@/lib/queries/vault"
import { useTable } from "@/hooks/useTable"
import { DataTable } from "@/components/ui/data-tables/DataTable"
import { Separator } from "@/components/ui/Separator"
import { buttonVariants } from "@/components/ui/variants/button"
import { Heading } from "@/components/Heading"
import { Loading } from "@/components/Loading"

import { notesTableRoute } from "."
import { useMemoizedNotesColumns } from "./NotesColumns"
import { NotesTableToolbar } from "./NotesTableToolbar"

interface NotesTableProps {}

const NotesTable: React.FC<NotesTableProps> = () => {
  const search = notesTableRoute.useSearch()
  const context = notesTableRoute.useRouteContext()
  const columns = useMemoizedNotesColumns()

  const { data, isLoading } = useVaultQuery(
    "table",
    context.user!.active_vault!.id!,
    0,
    0, // retrieve all
    search.filter
  )

  const defaultData = useMemo(() => [], [])
  const table = useTable({
    data: data?.notes ?? defaultData,
    columns,
    rowCount: data?.count ?? 0,
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center w-full">
        <Heading title="Notes Table" description="Manage notes for vault" />
        <Link to="/" className={buttonVariants({ size: "xs" })}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add New
        </Link>
      </div>
      <Separator />
      <DataTable table={table} toolbar={<NotesTableToolbar table={table} />} />
    </div>
  )
}

export default NotesTable
