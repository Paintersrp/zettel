import React from "react"
import { Link } from "@tanstack/react-router"
import {
  BanIcon,
  MoreHorizontal,
  SaveIcon,
  SendHorizonalIcon,
  Trash,
} from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

interface NoteEditDropdownProps {
  note: NoteWithDetails
}

const NoteEditDropdown: React.FC<NoteEditDropdownProps> = ({ note }) => {
  const { open, setOpen } = useReactiveOpen()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="btn-secondary text-primary hover:bg-contrast-hover bg-contrast px-1.5 py-1.5 h-9">
          <MoreHorizontal className="size-5 text-primary" />
          <span className="sr-only">Toggle Note Settings Menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] max-w-[200px]">
        <DropdownMenuLabel className="flex flex-col gap-0.5 text-primary font-normal">
          <span>Note: {note.id}</span>
          <span className="font-normal text-default truncate">
            {note.title}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
          <span>Edit Actions</span>
        </DropdownMenuLabel>

        <DropdownMenuItem className="group px-0 py-0">
          <button className="px-2 py-1.5 flex w-full items-center justify-between gap-4 rounded group-hover:text-success hover:bg-contrast-hover transition text-muted">
            Submit
            <SendHorizonalIcon className="size-5" />
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem className="group px-0 py-0">
          <button className="px-2 py-1.5 flex w-full items-center justify-between gap-4 rounded group-hover:text-success hover:bg-contrast-hover transition text-muted">
            Save Draft
            <SaveIcon className="size-5" />
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem className="group px-0 py-0">
          <Link
            to="/notes/$id"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            className="px-2 py-1.5 flex w-full items-center justify-between gap-4 rounded group-hover:text-error hover:bg-contrast-hover transition text-muted"
          >
            Cancel
            <BanIcon className="size-5" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
          <span>Note Actions</span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="group px-0 py-0">
          <button className="px-2 py-1.5 flex w-full items-center justify-between gap-4 rounded group-hover:text-error hover:bg-contrast-hover transition text-muted">
            Delete
            <Trash className="size-5" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NoteEditDropdown
