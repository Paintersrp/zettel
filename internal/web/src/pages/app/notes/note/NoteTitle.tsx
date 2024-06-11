import { format } from "date-fns"

import { NoteWithDetails } from "@/types/app"
import BackButton from "@/components/BackButton"
import { CalendarIcon } from "@/components/icons"

interface NoteTitleProps {
  note: NoteWithDetails
}

const NoteTitle: React.FC<NoteTitleProps> = ({ note }) => {
  return (
    <div className="w-full bg-page sm:sticky sm:top-0 z-10 p-2">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center gap-4">
          <BackButton />

          <div>
            <div className="flex items-center">
              <span className="size-4 mr-1 text-primary">
                <CalendarIcon />
              </span>
              <span className="text-[0.8rem] font-medium">
                {format(new Date(note.created_at), "MMM d, yyyy")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {note.title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export { NoteTitle }
