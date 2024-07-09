import type { FC } from "react"
import { CalendarIcon } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { formatDate } from "@/lib/date"

import { NoteInformationButton } from "./NoteInformationButton"
import NoteInfoSheet from "./NoteInfoSheet"

interface NoteTitleProps {
  note: NoteWithDetails
  menu?: React.ReactNode
}

const NoteTitle: FC<NoteTitleProps> = ({ note, menu }) => {
  const formattedDate = formatDate(note.created_at)

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
            <NoteInformationButton note={note} />
            {menu && menu}
          </div>
        </div>
      </div>
    </div>
  )
}

export { NoteTitle }
