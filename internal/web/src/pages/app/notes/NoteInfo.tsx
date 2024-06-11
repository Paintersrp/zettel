import { FC } from "react"
import { Link } from "@tanstack/react-router"
import { format } from "date-fns"
import { CalendarDays } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { LinkIcon, TagsIcon } from "@/components/icons"

interface NoteInfoProps {
  note: NoteWithDetails
}

const NoteInfo: FC<NoteInfoProps> = ({ note }) => {
  return (
    <div className="flex flex-col md:w-1/2">
      <div className="flex items-center mb-1">
        <CalendarDays className="size-4 mr-1 text-primary" />
        <span className="text-[0.8rem] font-medium">
          {format(new Date(note.updated_at), "MMM d, yyyy")}
        </span>
      </div>
      <div className="flex flex-col justify-between h-full">
        <h2 className="text-xl font-semibold mb-1">
          <Link
            to="/notes/$id"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
          >
            {note.title}
          </Link>
        </h2>
        <div className="flex flex-col md:flex-row md:gap-4 md:justify-between">
          <div className="flex-grow flex flex-col md:min-w-1/2">
            <div className="pb-4">
              <h3 className="font-semibold text-lg flex items-center mb-2 pb-1 border-b">
                <span className="size-6 mr-1 text-primary">
                  <TagsIcon />
                </span>
                Tags
              </h3>
              <div className="flex gap-1 flex-wrap">
                {note.tags?.length > 0 ? (
                  note.tags?.map((tag) => (
                    <span
                      key={tag.name}
                      className="inline-block bg-primary text-xs font-semibold px-2 py-1 rounded"
                    >
                      {tag.name}
                    </span>
                  ))
                ) : (
                  <span className="inline-block text-[0.8rem] font-semibold">
                    Note has no tags
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold flex items-center mb-2 pb-1 border-b">
                <span className="size-6 mr-1 text-secondary">
                  <LinkIcon />
                </span>
                Linked Notes
              </h3>
              <div className="flex gap-1 flex-wrap">
                {note.linkedNotes?.length > 0 ? (
                  note.linkedNotes?.map((link) => (
                    <span
                      key={link.title}
                      className="inline-block bg-secondary text-xs font-semibold px-2 py-1 rounded"
                    >
                      {link.title}
                    </span>
                  ))
                ) : (
                  <span className="inline-block text-[0.8rem] font-semibold">
                    Note has no links
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteInfo
