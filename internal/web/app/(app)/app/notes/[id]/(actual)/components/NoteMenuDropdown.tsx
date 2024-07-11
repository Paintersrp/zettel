import type { Dispatch, FC, SetStateAction } from "react"
import { EditIcon, MoreHorizontal, Trash } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
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

interface NoteMenuDropdownProps {
  note: NoteWithDetails
  onDelete: () => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const NoteMenuDropdown: FC<NoteMenuDropdownProps> = ({
  note,
  onDelete,
  open,
  setOpen,
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="iconXs">
          <MoreHorizontal className="size-5 text-primary" />
          <span className="sr-only">Toggle Note Settings Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[160px] max-w-[200px]"
      >
        <DropdownMenuLabel className="flex flex-col gap-0.5 text-primary">
          <span>Note: {note.id}</span>
          <span className="font-normal text-default truncate">
            {note.title}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel>
          <span>Note Actions</span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="group px-0 py-0">
          <MenuLink href={`/app/notes/${note.id}/edit`} palette="success">
            Edit
            <EditIcon className="size-5" />
          </MenuLink>
        </DropdownMenuItem>

        <DropdownMenuItem className="group px-0 py-0">
          <MenuButton onClick={onDelete} palette="error">
            Delete
            <Trash className="size-5" />
          </MenuButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NoteMenuDropdown
