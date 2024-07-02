import { useMemo } from "react"
import { Link } from "@tanstack/react-router"
import { PlusCircle } from "lucide-react"

import { useTable } from "@/hooks/useTable"

import { DataTable } from "@/components/ui/data-tables/DataTable"
import { Separator } from "@/components/ui/Separator"
import { buttonVariants } from "@/components/ui/variants/button"
import { Heading } from "@/components/Heading"
import { Loading } from "@/components/Loading"
import { useGetNotes } from "@/features/app/notes-table/api/getNotes"
import { useMemoizedNotesColumns } from "@/features/app/notes-table/components/NotesColumns"
import { NotesTableToolbar } from "@/features/app/notes-table/components/NotesTableToolbar"
import { useAuth } from "@/features/auth/providers"

import { notesTableRoute } from "."

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

  if (notesQuery.isLoading) {
    return <Loading />
  }

  return (
    <div className="w-full space-y-2 p-2">
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
