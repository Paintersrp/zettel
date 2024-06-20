import { FC, memo } from "react"
import { Link } from "@tanstack/react-router"
import { format } from "date-fns"
import { CalendarDays, LinkIcon, TagsIcon, Tally5 } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { Skeleton } from "@/components/ui/Skeleton"

interface NoteListItemMobileProps {
  note: NoteWithDetails
}

const NoteListItemMobile: FC<NoteListItemMobileProps> = memo(({ note }) => {
  const contentWordCount = note.content.split(" ").length
  const wordCount = `${contentWordCount} Word${contentWordCount > 1 ? "s" : ""}`

  return (
    <Link
      to={`/notes/$id`}
      params={{ id: note.id.toString() }}
      state={{ note: note }}
      className="bg-contrast block py-3 px-3 rounded-lg transition-colors duration-200"
    >
      <div className="flex flex-col">
        <div className="text-xs flex items-center gap-1 font-semibold mb-2">
          <CalendarDays className="size-4 text-primary" />
          {format(new Date(note.created_at), "MMM d, yyyy")}
        </div>
        <h2 className="text-xl font-bold mb-2">{note.title}</h2>
        <div className="flex flex-col items-start gap-1 text-xs text-muted">
          <span className="flex gap-1 items-center font-semibold">
            <Tally5 className="size-4 text-primary" />
            {wordCount}
          </span>

          <div className="flex gap-2 font-semibold">
            <span className="flex gap-1 items-center">
              <TagsIcon className="size-4 text-primary" />
              {note.tags?.length ?? 0} Tags
            </span>
            <span className="flex gap-1 items-center">
              <LinkIcon className="size-4 text-primary" />
              {note.linkedNotes?.length ?? 0} Links
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
})

export const NoteListItemMobileSkeleton: FC = () => {
  return (
    <div className="bg-contrast block py-3 px-3 rounded-lg">
      <div className="flex flex-col">
        <div className="text-xs flex items-center gap-1 font-semibold mb-2 py-1">
          <Skeleton className="size-4 h-4 w-4 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2 rounded" />
        <div className="flex flex-col items-start gap-1 text-xs text-muted py-1">
          <span className="flex gap-1 items-center font-semibold">
            <Skeleton className="size-4 rounded" />
            <Skeleton className="h-4 w-20" />
          </span>

          <div className="flex gap-2 font-semibold">
            <span className="flex gap-1 items-center">
              <Skeleton className="size-4 rounded" />
              <Skeleton className="h-4 w-12" />
            </span>
            <span className="flex gap-1 items-center">
              <Skeleton className="size-4 rounded" />
              <Skeleton className="h-4 w-12" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteListItemMobile
