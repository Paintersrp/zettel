import { Dispatch, FC, SetStateAction } from "react"
import { EditIcon, MoreHorizontal, Trash } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
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

interface NoteMenuDrawerProps {
  note: NoteWithDetails
  onDelete: () => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const NoteMenuDrawer: FC<NoteMenuDrawerProps> = ({
  note,
  onDelete,
  open,
  setOpen,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="btn-secondary text-primary hover:bg-contrast-hover bg-contrast px-1.5 py-1.5 h-9">
          <MoreHorizontal className="size-5 text-primary" />
          <span className="sr-only">Toggle Settings Menu</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg text-primary">
            Note: {note.id}
          </DrawerTitle>
          <DrawerDescription className="text-base font-semibold">
            {note.title}
          </DrawerDescription>
        </DrawerHeader>
        <nav className="grid p-2">
          <DrawerTitle className="px-2 py-2 text-primary">
            Note Actions
          </DrawerTitle>
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

export default NoteMenuDrawer