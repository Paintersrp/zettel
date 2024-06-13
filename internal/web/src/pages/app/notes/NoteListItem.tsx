import { FC, memo } from "react"
import { Link } from "@tanstack/react-router"
import { format } from "date-fns"
import {
  BookOpen,
  CalendarDays,
  EditIcon,
  LinkIcon,
  TagsIcon,
  Tally5,
} from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { Skeleton } from "@/components/ui/Skeleton"

interface NoteListItemProps {
  note: NoteWithDetails
  isSelected: boolean
}

// TODO: More Icon with Delete opposite date?

const NoteListItem: FC<NoteListItemProps> = ({ note, isSelected }) => {
  const contentWordCount = note.content.split(" ").length

  return (
    <button
      className={`py-2 w-full px-3 mb-1 rounded flex flex-col gap-1.5 transition-colors duration-200 cursor-pointer ${
        isSelected ? "bg-page" : "bg-contrast-hover hover:bg-page"
      }`}
    >
      <div className="text-xs text-muted items-center flex gap-1 font-semibold">
        <CalendarDays className="size-4 text-primary" />
        {format(new Date(note.created_at), "MMM d, yyyy")}
      </div>
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-bold">{note.title}</h2>
      </div>

      <div className="flex gap-4 text-sm justify-between items-end">
        <div className="flex flex-col items-start gap-1 text-xs text-muted">
          <span className="flex gap-1 items-center font-semibold">
            <Tally5 className="size-4 text-primary" /> {contentWordCount} Words
          </span>

          <div className="flex gap-2 text-xs font-semibold">
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
        <div className="space-x-2">
          <Link
            to="/notes/$id"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            className="btn-secondary border-none text-primary hover:bg-primary bg-contrast px-1.5 py-1.5 h-7"
          >
            <BookOpen className="size-4" />

            <span className="sr-only">Toggle Settings Menu</span>
          </Link>
          <Link
            to="/notes/$id/edit"
            params={{ id: note.id.toString() }}
            state={{ note: note }}
            className="btn-secondary border-none text-primary hover:bg-primary bg-contrast px-1.5 py-1.5 h-7"
          >
            <EditIcon className="size-4" />

            <span className="sr-only">Toggle Settings Menu</span>
          </Link>
        </div>
      </div>
    </button>
  )
}

export const NoteListItemSkeleton: FC = () => {
  return (
    <div className="py-2 w-full px-3 mb-1 rounded bg-contrast-hover flex flex-col gap-1.5">
      <Skeleton className="h-4 w-28 mb-1 bg-contrast rounded" />
      <div className="flex items-start justify-between">
        <Skeleton className="h-6 w-3/4 mb-1 bg-contrast rounded" />
      </div>
      <div className="flex gap-4 text-sm justify-between items-end">
        <div className="flex flex-col items-start gap-1 text-xs">
          <Skeleton className="h-4 w-16 mb-1 bg-contrast rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-12 bg-contrast rounded" />
            <Skeleton className="h-4 w-12 bg-contrast rounded" />
          </div>
        </div>
        <div className="flex space-x-2">
          <Skeleton className="size-6 rounded bg-contrast" />
          <Skeleton className="size-6 rounded bg-contrast" />
        </div>
      </div>
    </div>
  )
}

export default memo(NoteListItem)