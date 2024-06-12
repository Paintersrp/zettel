import React, { useEffect, useState } from "react"
import { Link, useRouter } from "@tanstack/react-router"
import { TableProperties } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/Sheet"

import { NoteInformation } from "./NoteInformation"

interface NoteInfoSheetProps {
  note: NoteWithDetails
}

const NoteInfoSheet: React.FC<NoteInfoSheetProps> = ({ note }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [router.state.location])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="btn-secondary text-primary border-none px-2 py-2 ml-2">
        <TableProperties className="size-6 text-primary" />
      </SheetTrigger>
      <SheetContent className="max-w-[340px] sm:max-w-[320px] h-full flex flex-col">
        <SheetHeader className="pb-4">
          <TableProperties className="size-6 text-primary" />
        </SheetHeader>
        <NoteInformation note={note} />
      </SheetContent>
    </Sheet>
  )
}

interface DrawerListItemProps {
  text: string
  to: string
  params?: any
  icon: React.ReactNode
}

const DrawerListItem: React.FC<DrawerListItemProps> = ({
  text,
  to,
  params,
  icon,
}) => {
  return (
    <li>
      <Link
        to={to}
        params={params ?? {}}
        className="flex gap-4 items-center justify-between px-4 py-2 text-muted rounded hover:bg-contrast"
      >
        {text}
        <div className="size-6 text-primary">{icon}</div>
      </Link>
    </li>
  )
}

export default NoteInfoSheet
