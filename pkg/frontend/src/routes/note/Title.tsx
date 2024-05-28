import { format } from "date-fns"
import { useNavigate } from "react-router-dom"

import { NoteWithDetails } from "@/types/app"
import { ArrowLeftIcon, CalendarIcon } from "@/components/icons"

interface TitleProps {
  note: NoteWithDetails
}

const Title: React.FC<TitleProps> = ({ note }) => {
  const navigate = useNavigate()

  return (
    <div className="w-full bg-page md:sticky md:top-0 z-30 p-2">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center gap-4">
          <div>
            <button
              data-tooltip="Back"
              onClick={() => navigate(-1)}
              className="btn-primary px-1 py-1 text-sm rounded"
            >
              <span className="size-6">
                <ArrowLeftIcon />
              </span>
            </button>
          </div>
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

export { Title }
