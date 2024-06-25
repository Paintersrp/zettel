import type { FC } from "react"
import { CalendarIcon } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { NoteWithDetails } from "@/types/app"

import NoteInfoSheet from "./NoteInfoSheet"

interface NoteTitleProps {
  note: NoteWithDetails
  menu?: React.ReactNode
}

const NoteTitle: FC<NoteTitleProps> = ({ note, menu }) => {
  const formattedDate = formatDate(note.created_at)

  return (
    <div className="w-full bg-page sm:sticky sm:top-0 z-10 pb-2 pt-4">
      <div className="mb-2 flex justify-between w-full">
        <div className="flex items-start gap-4 w-full">
          {menu && menu}

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
        </div>
      </div>
    </div>
  )
}

export { NoteTitle }
