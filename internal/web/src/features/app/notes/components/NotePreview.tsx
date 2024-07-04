import { memo, type FC } from "react"

import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { capFirst } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { AppScrollToTop } from "@/components/AppScrollToTop"
import { MarkdownIcon } from "@/components/icons"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"

import { NoteLinkButtons, NoteLinkButtonsSkeleton } from "./NoteLinkButtons"
import { NotePreviewSkeleton } from "./NotePreviewSkeleton"

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
      <AppScrollToTop visible={isOverThreshold} onClick={scrollToTop} />
    </div>
  )
})

export default NotePreview
