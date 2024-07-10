import type { FC } from "react"
import { CalendarIcon } from "lucide-react"

import { formatDate } from "@/lib/date"
import { getNote } from "@/app/(app)/lib/getNote"

import { NoteInformationButton } from "./NoteInformationButton"
import NoteInfoSheet from "./NoteInfoSheet"
import { NoteMenu } from "./NoteMenu"

interface NoteTitleProps {
  id: string
}

const NoteTitle: FC<NoteTitleProps> = async ({ id }) => {
  const note = await getNote(id)
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
            <NoteMenu note={note} />
          </div>
        </div>
      </div>
    </div>
  )
}

export { NoteTitle }
