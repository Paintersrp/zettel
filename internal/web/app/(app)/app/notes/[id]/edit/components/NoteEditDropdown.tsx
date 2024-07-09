import type { Dispatch, FC, SetStateAction } from "react"
import {
  BanIcon,
  MoreHorizontal,
  SaveIcon,
  SendHorizonalIcon,
  Trash,
} from "lucide-react"

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

interface NoteEditDropdownProps {
  note: NoteWithDetails
  onSubmitEdit: () => void
  onSaveDraft: () => void
  onDelete: () => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const NoteEditDropdown: FC<NoteEditDropdownProps> = ({
  note,
  onSubmitEdit,
  onSaveDraft,
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
          <span className="font-normal text-muted-foreground truncate">
            {note.title}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel>
          <span>Edit Actions</span>
        </DropdownMenuLabel>

        <DropdownMenuItem className="group px-0 py-0">
          <MenuButton palette="success" onClick={onSubmitEdit}>
            Submit
            <SendHorizonalIcon className="size-5" />
          </MenuButton>
        </DropdownMenuItem>

        <DropdownMenuItem className="group px-0 py-0">
          <MenuButton palette="success" onClick={onSaveDraft}>
            Save Draft
            <SaveIcon className="size-5" />
          </MenuButton>
        </DropdownMenuItem>

        <DropdownMenuItem className="group px-0 py-0">
          <MenuLink href={`/app/notes/${note.id}`} palette="error">
            Cancel
            <BanIcon className="size-5" />
          </MenuLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuLabel>
          <span>Note Actions</span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="group px-0 py-0">
          <MenuButton palette="error" onClick={onDelete}>
            Delete
            <Trash className="size-5" />
          </MenuButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NoteEditDropdown
