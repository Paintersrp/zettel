import { forwardRef } from "react"
import dynamic from "next/dynamic"
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query"

import type { NoteWithDetails, VaultResponse } from "@/types/app"
import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { Loading } from "@/components/Loading"

import { NoteListItemSkeleton } from "./NoteListItemSkeleton"
import NoteListSkeleton from "./NoteListSkeleton"

const ScrollArea = dynamic(
  () =>
    import("@/components/ui/ScrollArea").then((module) => ({
      default: module.ScrollArea,
    })),
  { loading: () => <NoteListSkeleton /> }
)

const NoteListItem = dynamic(() => import("./NoteListItem"), {
  loading: () => <NoteListItemSkeleton />,
})

const AppScrollToTop = dynamic(() =>
  import("@/components/AppScrollToTop").then((module) => ({
    default: module.AppScrollToTop,
  }))
)

interface NoteListProps {
  query: UseInfiniteQueryResult<InfiniteData<VaultResponse, unknown>, Error>
  filter: string
  notes?: NoteWithDetails[]
  ref: (element: HTMLElement | null) => void
}

export const NoteList = forwardRef<HTMLDivElement, NoteListProps>(
  ({ query, filter, notes }, ref) => {
    const { scrollAreaRef, isOverThreshold, scrollToTop } =
      useScrollAreaScrollToTop()

    const hasNotes = notes && notes.length > 0 && notes[0] !== null

    return (
      <div className="h-full flex flex-col relative">
        <ScrollArea
          viewportRef={scrollAreaRef}
          key={filter}
          className="flex-grow bg-accent pb-2"
        >
          <div className="grid grid-cols-1">
            {hasNotes ? (
              notes.map((note, index) => {
                const isLast = index === notes!.length - 1

                return (
                  <div ref={isLast ? ref : null} key={note.id}>
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
          {query.isFetchingNextPage && (
            <div className="flex justify-center items-center py-4">
              <Loading />
            </div>
          )}
        </ScrollArea>
        <AppScrollToTop visible={isOverThreshold} onClick={scrollToTop} />
      </div>
    )
  }
)

NoteList.displayName = "NoteList"

export default NoteList
