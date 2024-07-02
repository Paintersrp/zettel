import { forwardRef } from "react"
import { Link } from "@tanstack/react-router"
import { CalendarDays, ChevronRight, FileText } from "lucide-react"

import { formatDate } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { Card } from "@/components/ui/Card"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"
import { Loading } from "@/components/Loading"

interface PanelNoteListProps {
  notes: NoteWithDetails[]
  isFetchingNextPage: boolean
}

// TODO: isActive from note.id and pathname id
// TODO: h-[calc(100vh-6rem)] and friends as tailwind apply class?

export const PanelNoteList = forwardRef<HTMLDivElement, PanelNoteListProps>(
  ({ notes, isFetchingNextPage }, ref) => {
    return (
      <ScrollArea className="h-[calc(100vh-6rem)] py-2 mb-4 md:py-0 md:mb-0">
        <div className="space-y-0">
          {notes.map((note, index) => {
            const isLast = index === notes.length - 1
            return (
              <div key={note.id} ref={isLast ? ref : null}>
                <Card className="bg-accent hover:bg-background sine-free duration-100 border-none p-2">
                  <Link
                    to="/app/notes/$id"
                    params={{ id: note.id.toString() }}
                    state={{ note }}
                    className="flex items-center justify-between"
                    preload={false}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate mb-1">
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
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </Card>
                {!isLast && <Separator />}
              </div>
            )
          })}
          {isFetchingNextPage && <Loading className="mt-4 mb-10" />}
        </div>
      </ScrollArea>
    )
  }
)

PanelNoteList.displayName = "PanelNoteList"

export default PanelNoteList
