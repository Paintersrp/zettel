"use client"

import { useEffect, useState, type FC } from "react"
import { usePathname } from "next/navigation"
import { TableProperties } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { Button } from "@/components/ui/button/Button"
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

const NoteInfoSheet: FC<NoteInfoSheetProps> = ({ note }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="iconSm">
          <TableProperties className="size-6 text-primary" />
          <span className="sr-only">Open Note Information Panel</span>
        </Button>
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

export default NoteInfoSheet
