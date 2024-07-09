import { memo, type FC } from "react"

import type { NoteWithDetails } from "@/types/app"
import { capFirst } from "@/lib/string"
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
  return (
    <div className="flex flex-col relative">
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

      <div className="h-[calc(100vh-9rem)] w-full">
        {note ? (
          <Prose className="mb-10 bg-card">
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
