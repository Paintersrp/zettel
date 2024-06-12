import React from "react"
import {
  BanIcon,
  MoreHorizontal,
  Save,
  SendHorizontal,
  Trash,
} from "lucide-react"

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
import {
  NoteMenuButton,
  NoteMenuLink,
} from "@/pages/app/notes/note/NoteMenuItems"

interface NoteEditDrawerProps {
  note: NoteWithDetails
  onSubmitEdit: () => void
  onSaveDraft: () => void
  onDelete: () => void
}

const NoteEditDrawer: React.FC<NoteEditDrawerProps> = ({
  note,
  onSubmitEdit,
  onSaveDraft,
  onDelete,
}) => {
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
        <nav className="grid px-2">
          <DrawerTitle className="px-2 py-2">Edit Actions</DrawerTitle>
          <NoteMenuButton
            variant="drawer"
            palette="success"
            onClick={onSubmitEdit}
          >
            Submit
            <SendHorizontal className="size-5" />
          </NoteMenuButton>
          <NoteMenuButton
            variant="drawer"
            palette="success"
            onClick={onSaveDraft}
          >
            Save Draft
            <Save className="size-5" />
          </NoteMenuButton>
          <NoteMenuLink
            to="/notes/$id"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            variant="drawer"
            palette="error"
          >
            Cancel
            <BanIcon className="size-5" />
          </NoteMenuLink>

          <DrawerTitle className="px-2 py-2">Note Actions</DrawerTitle>
          <NoteMenuButton variant="drawer" palette="error" onClick={onDelete}>
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

export default NoteEditDrawer
