import type { Dispatch, FC, SetStateAction } from "react"
import { BookOpen, Edit, MoreHorizontal, Trash } from "lucide-react"

import type { NoteWithDetails } from "@/types/app"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { MenuButton, MenuLink } from "@/components/MenuItems"

interface NotesTableDropdownProps {
  note: NoteWithDetails
  onDelete: () => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const NotesTableDropdown: FC<NotesTableDropdownProps> = ({
  note,
  onDelete,
  open,
  setOpen,
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel className="flex flex-col gap-0.5 text-primary font-normal">
          <span>Note: {note.id}</span>
          <span className="font-normal text-default truncate">
            {note.title}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal text-muted-foreground">
          Note Actions
        </DropdownMenuLabel>

        <DropdownMenuItem className="group px-0 py-0">
          <MenuLink
            to="/app/notes/$id"
            state={{ note: note }}
            params={{ id: note.id.toString() }}
            palette="success"
          >
            View
            <BookOpen className="size-4" />
          </MenuLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="group px-0 py-0">
          <MenuLink
            to="/app/notes/$id/edit"
            state={{ note: note }}
            params={{ id: note.id.toString() }}
            palette="success"
          >
            Edit
            <Edit className="size-4" />
          </MenuLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="group px-0 py-0">
          <MenuButton onClick={onDelete} palette="error">
            Delete
            <Trash className="size-4" />
          </MenuButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotesTableDropdown
