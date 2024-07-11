import { type FC } from "react"
import { LinkIcon, TagsIcon } from "lucide-react"

import type { NoteWithDetails } from "@/types/app"
import { formatDate } from "@/utils/date"

interface QuickAccessItemProps {
  note: NoteWithDetails
}

export const QuickAccessItem: FC<QuickAccessItemProps> = ({ note }) => {
  const contentWordCount = note.content.split(" ").length
  const wordCount = `${contentWordCount} Word${contentWordCount > 1 ? "s" : ""}`
  const formattedDate = formatDate(note.created_at)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-default">{note.title}</h3>
          <div className="text-sm text-muted-foreground">
            <span>{formattedDate}</span>
            <span className="mx-1">|</span>
            <span>{wordCount}</span>
          </div>
        </div>
        <div className="flex flex-col justify-end items-center gap-0 text-muted-foreground">
          <span className="flex items-center text-base gap-1">
            <TagsIcon className="size-5 text-primary" />
            {note.tags?.length ?? 0}
          </span>
          <span className="flex items-center text-base gap-1">
            <LinkIcon className="size-5 text-primary" />
            {note.linked_notes?.length ?? 0}
          </span>
        </div>
      </div>
    </div>
  )
}

export default QuickAccessItem
