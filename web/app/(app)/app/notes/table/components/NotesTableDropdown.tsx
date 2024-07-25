import type { Dispatch, FC, SetStateAction } from "react"
import { BookOpen, Edit, MoreHorizontal, Trash } from "lucide-react"

import type { NoteWithDetails } from "@/types/app"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/button/Button"
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
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop) {
    return null
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 group-hover:bg-primary/10 sine-free duration-200"
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
          <MenuLink href={`/app/notes/${note.id}`} palette="success">
            View
            <BookOpen className="size-4" />
          </MenuLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="group px-0 py-0">
          <MenuLink href={`/app/notes/${note.id}/edit`} palette="success">
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
