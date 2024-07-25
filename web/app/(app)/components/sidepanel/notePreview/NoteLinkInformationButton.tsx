"use client"

import type { FC } from "react"
import { Info } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { Button } from "@/components/ui/button/Button"

import { useSidePanel } from "../useSidePanel"

interface NoteTitleProps {
  note: NoteWithDetails
}

const NoteLinkInformationButton: FC<NoteTitleProps> = ({ note }) => {
  const { openPanel } = useSidePanel()

  const onInfoClick = () => {
    openPanel("note-information", note.id.toString(), { note })
  }

  return (
    <Button
      variant="ghost"
      size="iconXs"
      className="!bg-accent hover:!bg-primary/20 text-primary"
      onClick={onInfoClick}
    >
      <Info className="size-5 text-primary" />
      <span className="sr-only">Toggle Note Information Panel</span>
    </Button>
  )
}

export { NoteLinkInformationButton }
