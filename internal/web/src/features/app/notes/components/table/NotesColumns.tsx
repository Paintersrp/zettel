import { useMemo } from "react"
import { Link } from "@tanstack/react-router"
import type { ColumnDef } from "@tanstack/react-table"

import { formatDate } from "@/lib/utils"
import type { NoteWithDetails, Tag } from "@/types/app"

import { Checkbox } from "@/components/ui/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-tables/DataTableColumnHeader"

import { NotesTableMenu } from "./NotesTableMenu"

export const useMemoizedNotesColumns = () => {
  return useMemo<ColumnDef<NoteWithDetails>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => {
          const isChecked =
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")

          return (
            <div className="flex">
              <Checkbox
                checked={isChecked}
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              />
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="flex">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableHiding: false,
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
          return (
            <Link
              to="/notes/$id"
              params={{ id: row.getValue("id") }}
              state={{ note: row.original }}
              className="truncate text-default hover:text-primary"
            >
              {row.getValue("title")}
            </Link>
          )
        },
      },
      {
        accessorKey: "updated_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Last Updated" />
        ),
        cell: ({ row }) => {
          const updatedAt: string = row.getValue("updated_at")
          const formattedDate = formatDate(updatedAt)
          return <div>{formattedDate}</div>
        },
      },

      {
        accessorKey: "tags",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tags" />
        ),
        cell: ({ row }) => {
          const tags: Tag[] = row.getValue("tags")
          const tagNames = tags.map((tag) => tag.name).join(", ")
          return <div>{tagNames}</div>
        },
        filterFn: (row, id, value) => {
          const tags: Tag[] = row.getValue(id)
          const tagNames = tags.map((tag) => tag.name.toLowerCase())
          return tagNames.some((tagName) =>
            tagName.includes(value.toLowerCase())
          )
        },
      },
      {
        accessorKey: "content",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Word Count" />
        ),
        cell: ({ row }) => {
          const content: string = row.getValue("content")
          const wordCount = content ? content.split(" ").length : 0
          return <div>{wordCount}</div>
        },
        sortingFn: (rowA, rowB) => {
          const contentA: string = rowA.getValue("content")
          const contentB: string = rowB.getValue("content")
          const wordCountA = contentA ? contentA.split(" ").length : 0
          const wordCountB = contentB ? contentB.split(" ").length : 0
          return wordCountA - wordCountB
        },
      },

      {
        id: "actions",
        cell: ({ row }) => <NotesTableMenu note={row.original} />,
      },
    ],
    []
  )
}
