import type { Dispatch, FC, SetStateAction } from "react"
import { BookOpen, EditIcon, MoreHorizontal, Trash } from "lucide-react"

import type { NoteWithDetails } from "@/types/app"

import { Button } from "@/components/ui/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import { MenuButton, MenuLink } from "@/components/MenuItems"

interface NotesTableDrawerProps {
  note: NoteWithDetails
  onDelete: () => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const NotesTableDrawer: FC<NotesTableDrawerProps> = ({
  note,
  onDelete,
  open,
  setOpen,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg text-primary">
            Note: {note.id}
          </DrawerTitle>
          <DrawerDescription className="font-semibold text-base">
            {note.title}
          </DrawerDescription>
        </DrawerHeader>
        <nav className="grid p-2">
          <DrawerTitle className="px-2 py-2 text-primary">
            Note Actions
          </DrawerTitle>

          <MenuLink
            to="/notes/$id"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            variant="drawer"
            palette="success"
          >
            View
            <BookOpen className="size-5" />
          </MenuLink>
          <MenuLink
            to="/notes/$id/edit"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            variant="drawer"
            palette="success"
          >
            Edit
            <EditIcon className="size-5" />
          </MenuLink>
          <MenuButton onClick={onDelete} variant="drawer" palette="error">
            Delete
            <Trash className="size-5" />
          </MenuButton>
        </nav>
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="outline" className="hover:text-primary">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default NotesTableDrawer
