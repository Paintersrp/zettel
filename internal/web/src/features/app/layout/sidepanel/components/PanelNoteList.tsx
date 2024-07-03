import { ForwardedRef, forwardRef } from "react"
import { Link, useRouter } from "@tanstack/react-router"
import { CalendarDays, ChevronRight, FileText } from "lucide-react"

import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { cn, formatDate } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { Card } from "@/components/ui/Card"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"
import { Loading } from "@/components/Loading"
import { ScrollToTopApp } from "@/components/ScrollToTop"

interface PanelNoteListProps {
  notes: NoteWithDetails[]
  isFetchingNextPage: boolean
}

// TODO: isActive from note.id and pathname id
// TODO: h-[calc(100vh-6rem)] and friends as tailwind apply class?

export const PanelNoteList = forwardRef<HTMLDivElement, PanelNoteListProps>(
  ({ notes, isFetchingNextPage }, ref) => {
    const router = useRouter()
    const pathname = router.state.location.pathname
    const { scrollAreaRef, isOverThreshold, scrollToTop } =
      useScrollAreaScrollToTop()

    return (
      <div className="flex w-full relative">
        <ScrollArea
          viewportRef={scrollAreaRef}
          className="h-[calc(100vh-6rem)] w-full py-2 mb-4 md:py-0 md:mb-0"
        >
          <div className="space-y-0">
            {notes.map((note, index) => {
              const isActive = pathname.includes(note.id.toString())
              const isLast = index === notes.length - 1

              return (
                <PanelNoteListItem
                  note={note}
                  isLast={isLast}
                  isActive={isActive}
                  ref={ref}
                />
              )
            })}
            {isFetchingNextPage && <Loading className="mt-4 mb-10" />}
          </div>
        </ScrollArea>
        <ScrollToTopApp visible={isOverThreshold} onClick={scrollToTop} />
      </div>
    )
  }
)

PanelNoteList.displayName = "PanelNoteList"

interface PanelNoteListItemProps {
  note: NoteWithDetails
  isLast: boolean
  isActive: boolean
  ref: ForwardedRef<HTMLDivElement>
}

export const PanelNoteListItem = forwardRef<
  HTMLDivElement,
  PanelNoteListItemProps
>(({ note, isLast, isActive }, ref) => {
  return (
    <div key={note.id} ref={isLast ? ref : null}>
      <Card
        className={cn(
          "bg-card hover:bg-primary/10 border-none p-2 rounded-none",
          isActive && "bg-accent hover:bg-accent"
        )}
      >
        <Link
          to="/app/notes/$id"
          params={{ id: note.id.toString() }}
          state={{ note }}
          className="flex items-center justify-between"
          disabled={isActive}
          preload={false}
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate mb-1">{note.title}</h3>
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
})

PanelNoteListItem.displayName = "PanelNoteListItem"

export default PanelNoteList
