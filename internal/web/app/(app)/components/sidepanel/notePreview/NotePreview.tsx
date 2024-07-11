import { memo, type FC } from "react"

import type { NoteWithDetails } from "@/types/app"
import { formatDate } from "@/utils/date"
import { capFirst } from "@/utils/string"
import { MarkdownIcon } from "@/components/icons"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"

import { NoteLinkButtons, NoteLinkButtonsSkeleton } from "./NoteLinkButtons"
import { NotePreviewSkeleton } from "./NotePreviewSkeleton"

interface NotePreviewProps {
  note: NoteWithDetails | null
}

export const NotePreview: FC<NotePreviewProps> = memo(({ note }) => {
  return (
    <div className="w-full flex flex-col relative">
      <div className="flex flex-col px-3 py-1 w-full border-b">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center flex-nowrap">
            <span className="size-5 text-primary">
              <MarkdownIcon />
            </span>
            {note && (
              <span className="text-xs text-muted-foreground">
                {formatDate(note.created_at)}
              </span>
            )}
          </div>
          {note ? <NoteLinkButtons note={note} /> : <NoteLinkButtonsSkeleton />}
        </div>
        <h1 className="text-xl font-bold">
          {note ? `${capFirst(note.title)}` : "No Note Selected"}
        </h1>
      </div>

      {/* TODO: ScrollArea + ScrollToTop */}
      <div className="h-[calc(100vh-9rem)] w-full">
        {note ? (
          <Prose className="mb-10 bg-card !w-full">
            <Markdown content={note.content} />
          </Prose>
        ) : (
          <NotePreviewSkeleton />
        )}
      </div>
    </div>
  )
})

export default NotePreview
