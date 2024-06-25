import { forwardRef, useCallback } from "react"
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query"

import type { NoteWithDetails, VaultResponse } from "@/types/app"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { Loading } from "@/components/Loading"

import { NoteListItem, NoteListItemSkeleton } from "./NoteListItem"

interface NoteListProps {
  query: UseInfiniteQueryResult<InfiniteData<VaultResponse, unknown>, Error>
  search: { filter: string }
  notes?: NoteWithDetails[]
  ref: (element: HTMLElement | null) => void
  handleNoteClick: (note: NoteWithDetails) => void
  selectedNote: NoteWithDetails | null
}

export const NoteList = forwardRef<HTMLDivElement, NoteListProps>(
  ({ query, search, notes, handleNoteClick, selectedNote }, ref) => {
    const renderSkeletons = useCallback((count: number) => {
      return Array.from({ length: count }).map((_, index) => (
        <NoteListItemSkeleton key={`desktop-${index}`} />
      ))
    }, [])

    if (query.isLoading || query.isRefetching) {
      return <ScrollArea className="h-[75vh]">{renderSkeletons(7)}</ScrollArea>
    }

    return notes && notes[0] !== null ? (
      <ScrollArea key={search.filter} className="h-[75vh]">
        {notes.map((note, index) => {
          const isLast = index === notes.length - 1

          return (
            <div
              ref={isLast ? ref : null}
              key={note.id}
              onClick={() => handleNoteClick(note)}
            >
              <NoteListItem
                note={note}
                isSelected={selectedNote?.id === note.id}
              />
            </div>
          )
        })}
        {query.isFetchingNextPage && <Loading className="mt-0 mb-10" />}
      </ScrollArea>
    ) : (
      <ScrollArea className="h-[75vh]">
        <div className="text-lg px-2 mb-2">No Notes to Display</div>
        <div>{renderSkeletons(1)}</div>
      </ScrollArea>
    )
  }
)

NoteList.displayName = "NoteList"

export default NoteList
