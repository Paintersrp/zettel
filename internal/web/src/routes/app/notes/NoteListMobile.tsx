import { forwardRef, useCallback } from "react"

import { NoteWithDetails } from "@/types/app"
import { Loading } from "@/components/Loading"

import NoteListItemMobile, {
  NoteListItemMobileSkeleton,
} from "./NoteListItemMobile"

interface NoteListMobileProps {
  isLoading: boolean
  isRefetching: boolean
  isFetchingNextPage: boolean
  notes?: NoteWithDetails[]
  ref: (element: HTMLElement | null) => void
}

const NoteListMobile = forwardRef<HTMLDivElement, NoteListMobileProps>(
  ({ isLoading, isRefetching, isFetchingNextPage, notes }, ref) => {
    const renderSkeletons = useCallback((count: number) => {
      return Array.from({ length: count }).map((_, index) => (
        <NoteListItemMobileSkeleton key={`mobile-${index}`} />
      ))
    }, [])

    if (isLoading || isRefetching) {
      return <div className="grid grid-cols-1 gap-2">{renderSkeletons(7)}</div>
    }

    return (
      notes &&
      notes[0] !== null && (
        <div className="grid grid-cols-1 gap-2">
          {notes.map((note, index) => (
            <div ref={index === notes.length - 1 ? ref : null} key={note.id}>
              <NoteListItemMobile note={note} />
            </div>
          ))}
          {isFetchingNextPage && <Loading className="mt-0 mb-10" />}
        </div>
      )
    )
  }
)

NoteListMobile.displayName = "NoteListMobile"

export default NoteListMobile
