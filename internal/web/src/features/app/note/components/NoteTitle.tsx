import type { FC } from "react"
import { CalendarIcon, Info } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { NoteWithDetails } from "@/types/app"

import { Button } from "@/components/ui/Button"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"

import NoteInfoSheet from "./NoteInfoSheet"

interface NoteTitleProps {
  note: NoteWithDetails
  menu?: React.ReactNode
}

const NoteTitle: FC<NoteTitleProps> = ({ note, menu }) => {
  const { openPanel } = useSidePanel()
  const formattedDate = formatDate(note.created_at)

  const onInfoClick = () => {
    openPanel("note-information", note.id.toString(), { note })
  }

  return (
    <div className="w-full px-4 py-2 h-22 bg-accent border-b">
      <div className="flex justify-between w-full">
        <div className="flex items-start gap-4 w-full">
          <div className="w-full flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <CalendarIcon className="size-4 mr-1 text-primary" />
                <span className="text-[0.8rem] font-medium">
                  {formattedDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-4xl font-bold text-primary">
                  {note.title}
                </h1>
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <NoteInfoSheet note={note} />
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="iconXs" onClick={onInfoClick}>
              <Info className="size-5 text-primary" />
              <span className="sr-only">Toggle Note Settings Menu</span>
            </Button>
            {menu && menu}
          </div>
        </div>
      </div>
    </div>
  )
}

export { NoteTitle }
