import React from "react"
import { EditIcon, MoreHorizontal, Trash } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
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

import { NoteMenuButton, NoteMenuLink } from "./NoteMenuItems"

interface NoteMenuDrawerProps {
  note: NoteWithDetails
  onDelete: () => void
}

const NoteMenuDrawer: React.FC<NoteMenuDrawerProps> = ({ note, onDelete }) => {
  const { open, setOpen } = useReactiveOpen()

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
          <DrawerTitle className="text-lg">Note: {note.id}</DrawerTitle>
          <DrawerDescription>{note.title}</DrawerDescription>
        </DrawerHeader>
        <nav className="grid p-2">
          <NoteMenuLink
            to="/notes/$id/edit"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            variant="drawer"
            palette="success"
          >
            Edit
            <EditIcon className="size-5" />
          </NoteMenuLink>

          <NoteMenuButton onClick={onDelete} variant="drawer" palette="error">
            Delete
            <Trash className="size-5" />
          </NoteMenuButton>
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
