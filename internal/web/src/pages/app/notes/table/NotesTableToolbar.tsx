import { Table } from "@tanstack/react-table"
import { CircleX, Search, X } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { Button } from "@/components/ui/Button"
import { DataTableViewOptions } from "@/components/ui/data-tables/DataTableViewOptions"
import { Input } from "@/components/ui/Input"

interface DataTableToolbarProps {
  table: Table<NoteWithDetails>
}

export function NotesTableToolbar({ table }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0
  const isTagFiltered = table.getColumn("tags")?.getIsFiltered()
  const isTitleFiltered = table.getColumn("title")?.getIsFiltered()

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative items-center flex justify-center">
          <Search className="absolute left-2 top-2 size-4 text-primary" />
          <Input
            placeholder={`Filter by title...`}
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="pl-7 h-8 w-[200px] lg:w-[300px]"
          />
          {isTitleFiltered && (
            <button
              onClick={() =>
                table.getColumn("title")?.setFilterValue(undefined)
              }
              className="absolute right-2 top-2 size-4 text-error hover:text-error-hover"
            >
              <CircleX className="size-4" />
            </button>
          )}
        </div>
        <div className="relative items-center flex justify-center">
          <Search className="absolute left-2 top-2 size-4 text-primary" />
          <Input
            placeholder={`Filter by tag...`}
            value={(table.getColumn("tags")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("tags")?.setFilterValue(event.target.value)
            }
            className="pl-7 h-8 w-[200px] lg:w-[300px]"
          />
          {isTagFiltered && (
            <button
              onClick={() => table.getColumn("tags")?.setFilterValue(undefined)}
              className="absolute right-2 top-2 size-4 text-error hover:text-error-hover"
            >
              <CircleX className="size-4" />
            </button>
          )}
        </div>
        {isFiltered && (
          <Button
            variant="primary"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
