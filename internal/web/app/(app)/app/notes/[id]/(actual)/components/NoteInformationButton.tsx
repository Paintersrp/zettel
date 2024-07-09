"use client"

import type { FC } from "react"
import { Info } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { Button } from "@/components/ui/Button"
import { useSidePanel } from "@/app/(app)/state/sidePanel"

interface NoteTitleProps {
  note: NoteWithDetails
}

const NoteInformationButton: FC<NoteTitleProps> = ({ note }) => {
  const { openPanel } = useSidePanel()

  const onInfoClick = () => {
    openPanel("note-information", note.id.toString(), { note })
  }

  return (
    <Button variant="outline" size="iconXs" onClick={onInfoClick}>
      <Info className="size-5 text-primary" />
      <span className="sr-only">Toggle Note Information Panel</span>
    </Button>
  )
}

export { NoteInformationButton }
