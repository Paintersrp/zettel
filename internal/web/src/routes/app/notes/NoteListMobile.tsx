import { forwardRef, useCallback } from "react"
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query"

import { NoteWithDetails, VaultResponse } from "@/types/app"
import { Loading } from "@/components/Loading"

import NoteListItemMobile, {
  NoteListItemMobileSkeleton,
} from "./NoteListItemMobile"

interface NoteListMobileProps {
  query: UseInfiniteQueryResult<InfiniteData<VaultResponse, unknown>, Error>

  notes?: NoteWithDetails[]
  ref: (element: HTMLElement | null) => void
}

const NoteListMobile = forwardRef<HTMLDivElement, NoteListMobileProps>(
  ({ query, notes }, ref) => {
    const renderSkeletons = useCallback((count: number) => {
      return Array.from({ length: count }).map((_, index) => (
        <NoteListItemMobileSkeleton key={`mobile-${index}`} />
      ))
    }, [])

    if (query.isLoading || query.isRefetching) {
      return <div className="grid grid-cols-1 gap-2">{renderSkeletons(7)}</div>
    }

    const hasNotes = notes && notes[0] !== null

    return (
      hasNotes && (
        <div className="grid grid-cols-1 gap-2">
          {notes.map((note, index) => {
            const isLast = index === notes.length - 1

            return (
              <div ref={isLast ? ref : null} key={note.id}>
                <NoteListItemMobile note={note} />
              </div>
            )
          })}
          {query.isFetchingNextPage && <Loading className="mt-0 mb-10" />}
        </div>
      )
    )
  }
)

NoteListMobile.displayName = "NoteListMobile"

export default NoteListMobile
