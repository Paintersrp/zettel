import { forwardRef, useCallback } from "react"
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query"

import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import type { NoteWithDetails, VaultResponse } from "@/types/app"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { Loading } from "@/components/Loading"
import { ScrollToTopApp } from "@/components/ScrollToTop"

import { NoteListItem, NoteListItemSkeleton } from "./NoteListItem"

interface NoteListProps {
  query: UseInfiniteQueryResult<InfiniteData<VaultResponse, unknown>, Error>
  search: { filter: string }
  notes?: NoteWithDetails[]
  handleNoteClick: (note: NoteWithDetails) => void
  ref: (element: HTMLElement | null) => void
}

export const NoteList = forwardRef<HTMLDivElement, NoteListProps>(
  ({ query, search, notes, handleNoteClick }, ref) => {
    const { scrollAreaRef, isOverThreshold, scrollToTop } =
      useScrollAreaScrollToTop()

    const renderSkeletons = useCallback((count: number) => {
      return Array.from({ length: count }).map((_, index) => (
        <NoteListItemSkeleton key={`skeleton-${index}`} />
      ))
    }, [])

    const isLoading = query.isLoading || query.isRefetching
    const hasNotes = notes && notes.length > 0

    return (
      <div className="h-full flex flex-col relative">
        <ScrollArea
          viewportRef={scrollAreaRef}
          key={search.filter}
          className="flex-grow bg-accent pb-2"
        >
          {isLoading ? (
            <div className="grid grid-cols-1">{renderSkeletons(10)}</div>
          ) : (
            <div className="grid grid-cols-1">
              {hasNotes ? (
                notes.map((note, index) => {
                  const isLast = index === notes!.length - 1

                  return (
                    <div
                      ref={isLast ? ref : null}
                      key={note.id}
                      onClick={() => handleNoteClick(note)}
                    >
                      <NoteListItem note={note} />
                    </div>
                  )
                })
              ) : (
                <div className="col-span-full text-lg p-4 text-center text-muted-foreground">
                  No Notes to Display
                </div>
              )}
            </div>
          )}
          {query.isFetchingNextPage && (
            <div className="flex justify-center items-center py-4">
              <Loading />
            </div>
          )}
        </ScrollArea>
        <ScrollToTopApp visible={isOverThreshold} onClick={scrollToTop} />
      </div>
    )
  }
)

NoteList.displayName = "NoteList"

export default NoteList
