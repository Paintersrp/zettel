import React from "react"
import { EditIcon, MoreHorizontal, Trash } from "lucide-react"

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

import { NoteMenuButton, NoteMenuLink } from "./NoteMenuItems"

interface NoteMenuDropdownProps {
  note: NoteWithDetails
  onDelete: () => void
}

const NoteMenuDropdown: React.FC<NoteMenuDropdownProps> = ({
  note,
  onDelete,
}) => {
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
          <span>Note Actions</span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="group px-0 py-0">
          <NoteMenuLink
            to="/notes/$id/edit"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            palette="success"
          >
            Edit
            <EditIcon className="size-5" />
          </NoteMenuLink>
        </DropdownMenuItem>

        <DropdownMenuItem className="group px-0 py-0">
          <NoteMenuButton onClick={onDelete} palette="error">
            Delete
            <Trash className="size-5" />
          </NoteMenuButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NoteMenuDropdown
