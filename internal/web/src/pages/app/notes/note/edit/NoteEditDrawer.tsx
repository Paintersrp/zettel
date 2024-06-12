import React from "react"
import { Link } from "@tanstack/react-router"
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

interface NoteEditDrawerProps {
  note: NoteWithDetails
}

const NoteEditDrawer: React.FC<NoteEditDrawerProps> = ({ note }) => {
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
          <button className="flex items-center justify-between gap-4 p-2 rounded text-muted hover:text-success hover:bg-contrast-hover transition">
            Submit
            <SendHorizontal className="size-5" />
          </button>
          <button className="flex items-center justify-between gap-4 p-2 rounded text-muted hover:text-success hover:bg-contrast-hover transition">
            Save Draft
            <Save className="size-5" />
          </button>
          <Link
            to="/notes/$id"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            className="flex items-center justify-between gap-4 p-2 rounded text-muted hover:text-error hover:bg-contrast-hover transition"
          >
            Cancel
            <BanIcon className="size-5" />
          </Link>

          <DrawerTitle className="px-2 py-2">Note Actions</DrawerTitle>
          <button className="flex items-center justify-between gap-4 p-2 rounded text-muted hover:text-error hover:bg-contrast-hover transition">
            Delete
            <Trash className="size-5" />
          </button>
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
