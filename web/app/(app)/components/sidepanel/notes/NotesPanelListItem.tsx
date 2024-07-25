"use client"

import { ForwardedRef, forwardRef } from "react"
import { CalendarDays, ChevronRight, FileText } from "lucide-react"

import type { NoteWithDetails } from "@/types/app"
import { cn } from "@/utils/cn"
import { formatDate } from "@/utils/date"
import { Card } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import Link from "@/components/Link"

interface NotesPanelListItemProps {
  note: NoteWithDetails
  isLast: boolean
  isActive: boolean
  ref: ForwardedRef<HTMLDivElement>
}

export const NotesPanelListItem = forwardRef<
  HTMLDivElement,
  NotesPanelListItemProps
>(({ note, isLast, isActive }, ref) => {
  return (
    <div key={note.id} ref={isLast ? ref : null}>
      <Card
        className={cn(
          "bg-card hover:bg-accent border-none p-2 rounded-none group",
          isActive && "bg-primary/20 hover:bg-primary/20"
        )}
      >
        <Link
          href={`/app/notes/${note.id}`}
          className="flex items-center justify-between"
          disabled={isActive}
        >
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium text-sm truncate mb-1 ${isActive && "text-primary"}`}
            >
              {note.title}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground space-x-2">
              <span className="flex items-center">
                <CalendarDays className="w-3 h-3 mr-1" />
                {formatDate(note.created_at)}
              </span>
              <Separator orientation="vertical" className="h-3" />
              <span className="flex items-center">
                <FileText className="w-3 h-3 mr-1" />
                {note.content.split(" ").length} words
              </span>
            </div>
          </div>
          <ChevronRight
            className={`size-5 mr-2 text-primary ${!isActive && "transition-transform duration-300 group-hover:translate-x-1"}`}
          />
        </Link>
      </Card>
      {!isLast && <Separator />}
    </div>
  )
})

NotesPanelListItem.displayName = " NotesPanelListItem"

export default NotesPanelListItem
