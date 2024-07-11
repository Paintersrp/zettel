"use client"

import { forwardRef } from "react"
import { usePathname } from "next/navigation"

import type { NoteWithDetails } from "@/types/app"
import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { AppScrollToTop } from "@/components/AppScrollToTop"
import { Loading } from "@/components/Loading"

import NotesPanelListItem from "./NotesPanelListItem"

interface NotesPanelListProps {
  notes: NoteWithDetails[]
  isFetchingNextPage: boolean
}

// TODO: isActive from note.id and pathname id
// TODO: h-[calc(100vh-6rem)] and friends as tailwind apply class?

export const NotesPanelList = forwardRef<HTMLDivElement, NotesPanelListProps>(
  ({ notes, isFetchingNextPage }, ref) => {
    const pathname = usePathname()
    const { scrollAreaRef, isOverThreshold, scrollToTop } =
      useScrollAreaScrollToTop()

    return (
      <div className="flex w-full relative">
        <ScrollArea
          viewportRef={scrollAreaRef}
          className="h-[calc(100vh-10.25rem)] w-full py-2 mb-4 md:py-0 md:mb-0"
        >
          <div className="space-y-0">
            {notes.map((note, index) => {
              const isActive = pathname.includes(note.id.toString())
              const isLast = index === notes.length - 1

              return (
                <NotesPanelListItem
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
        <AppScrollToTop visible={isOverThreshold} onClick={scrollToTop} />
      </div>
    )
  }
)

NotesPanelList.displayName = " NotesPanelList"

export default NotesPanelList
