import { memo, type FC } from "react"

import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { capFirst } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { Skeleton } from "@/components/ui/Skeleton"
import { MarkdownIcon } from "@/components/icons"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"
import { ScrollToTopApp } from "@/components/ScrollToTop"

import { NoteLinkButtons, NoteLinkButtonsSkeleton } from "./NoteLinkButtons"

interface NotePreviewProps {
  note: NoteWithDetails | null
}

// TODO: Repurpose for Side Panel?

export const NotePreview: FC<NotePreviewProps> = memo(({ note }) => {
  const { scrollAreaRef, isOverThreshold, scrollToTop } =
    useScrollAreaScrollToTop()
  return (
    <div className="bg-card flex flex-col w-full relative">
      <div className="flex justify-between items-center border-b px-2">
        <div className="flex gap-2 items-center h-12 px-1">
          <span className="size-7 text-primary">
            <MarkdownIcon />
          </span>
          <h1 className="text-xl font-bold">
            {note ? `${capFirst(note.title)}` : "No Note Selected"}
          </h1>
        </div>
        {note ? <NoteLinkButtons note={note} /> : <NoteLinkButtonsSkeleton />}
      </div>

      <ScrollArea
        id="note-content"
        viewportRef={scrollAreaRef}
        className="bg-card flex-grow h-[calc(100vh-9rem)] px-1"
      >
        {note ? (
          <Prose>
            <Markdown content={note.content} />
          </Prose>
        ) : (
          <NotePreviewSkeleton />
        )}
      </ScrollArea>
      <ScrollToTopApp visible={isOverThreshold} onClick={scrollToTop} />
    </div>
  )
})

const NotePreviewSkeleton = () => {
  return (
    <div className="px-4 py-6 font-semibold min-h-[77vh] max-h-[77vh] rounded space-y-4">
      <div>
        <Skeleton className="h-8 w-2/3 mb-4 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-3/4 mb-4 bg-card" />
      </div>
      <div className="pl-4 border-l-4 border-primary">
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-3/4 bg-card" />
      </div>

      <Skeleton className="h-0.5 w-full mb-2 bg-card" />
      <div>
        <div className="space-y-2 pl-6">
          <Skeleton className="h-6 w-1/2 mb-4 bg-card" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-card" />
            <Skeleton className="h-4 w-3/4 bg-card" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-card" />
            <Skeleton className="h-4 w-2/3 bg-card" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-card" />
            <Skeleton className="h-4 w-1/2 bg-card" />
          </div>
        </div>
      </div>

      <Skeleton className="h-0.5 w-full mb-2 bg-card" />
      <div>
        <Skeleton className="h-6 w-1/2 mb-4 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
      </div>
      <div className="pl-4 border-l-4 border-primary py-2">
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-3/4 bg-card" />
      </div>
      <div>
        <Skeleton className="h-4 w-3/4 mb-4 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-3/4 mb-4 bg-card" />
      </div>
    </div>
  )
}

export default NotePreview
