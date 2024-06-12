import React from "react"
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
import {
  NoteMenuButton,
  NoteMenuLink,
} from "@/pages/app/notes/note/NoteMenuItems"

interface NoteEditDropdownProps {
  note: NoteWithDetails
  onSubmitEdit: () => void
  onSaveDraft: () => void
  onDelete: () => void
}

const NoteEditDropdown: React.FC<NoteEditDropdownProps> = ({
  note,
  onSubmitEdit,
  onSaveDraft,
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
          <span>Edit Actions</span>
        </DropdownMenuLabel>

        <DropdownMenuItem className="group px-0 py-0">
          <NoteMenuButton palette="success" onClick={onSubmitEdit}>
            Submit
            <SendHorizonalIcon className="size-5" />
          </NoteMenuButton>
        </DropdownMenuItem>

        <DropdownMenuItem className="group px-0 py-0">
          <NoteMenuButton palette="success" onClick={onSaveDraft}>
            Save Draft
            <SaveIcon className="size-5" />
          </NoteMenuButton>
        </DropdownMenuItem>

        <DropdownMenuItem className="group px-0 py-0">
          <NoteMenuLink
            to="/notes/$id"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            palette="error"
          >
            Cancel
            <BanIcon className="size-5" />
          </NoteMenuLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
          <span>Note Actions</span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="group px-0 py-0">
          <NoteMenuButton palette="error" onClick={onDelete}>
            Delete
            <Trash className="size-5" />
          </NoteMenuButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NoteEditDropdown
