import { FC } from "react"

import { NoteWithDetails } from "@/types/app"
import { Skeleton } from "@/components/ui/Skeleton"
import { MarkdownIcon } from "@/components/icons"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"

import NoteLinkButtons, { NoteLinkButtonsSkeleton } from "./NoteLinkButtons"

interface NotePreviewProps {
  note: NoteWithDetails | null
}

const NotePreview: FC<NotePreviewProps> = ({ note }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center p-2">
          <span className="size-8 text-primary">
            <MarkdownIcon />
          </span>
          <h1 className="text-2xl font-bold">Note Preview</h1>
        </div>
        {note ? <NoteLinkButtons note={note} /> : <NoteLinkButtonsSkeleton />}
      </div>

      <div
        id="note-content"
        className="border rounded bg-contrast-hover overflow-auto max-h-[77vh] px-1"
      >
        {note ? (
          <Prose>
            <Markdown content={note.content} />
          </Prose>
        ) : (
          <NotePreviewSkeleton />
        )}
      </div>
    </div>
  )
}

const NotePreviewSkeleton = () => {
  return (
    <div className="px-4 py-6 font-semibold min-h-[77vh] max-h-[77vh] rounded space-y-4">
      <div>
        <Skeleton className="h-8 w-2/3 mb-4 bg-contrast" />
        <Skeleton className="h-4 w-full mb-2 bg-contrast" />
        <Skeleton className="h-4 w-full mb-2 bg-contrast" />
        <Skeleton className="h-4 w-3/4 mb-4 bg-contrast" />
      </div>
      <div className="pl-4 border-l-4 border-primary">
        <Skeleton className="h-4 w-full mb-2 bg-contrast" />
        <Skeleton className="h-4 w-3/4 bg-contrast" />
      </div>

      <Skeleton className="h-0.5 w-full mb-2 bg-contrast" />
      <div>
        <div className="space-y-2 pl-6">
          <Skeleton className="h-6 w-1/2 mb-4 bg-contrast" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-contrast" />
            <Skeleton className="h-4 w-3/4 bg-contrast" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-contrast" />
            <Skeleton className="h-4 w-2/3 bg-contrast" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-contrast" />
            <Skeleton className="h-4 w-1/2 bg-contrast" />
          </div>
        </div>
      </div>

      <Skeleton className="h-0.5 w-full mb-2 bg-contrast" />
      <div>
        <Skeleton className="h-6 w-1/2 mb-4 bg-contrast" />
        <Skeleton className="h-4 w-full mb-2 bg-contrast" />
        <Skeleton className="h-4 w-full mb-2 bg-contrast" />
        <Skeleton className="h-4 w-full mb-2 bg-contrast" />
      </div>
      <div className="pl-4 border-l-4 border-primary py-2">
        <Skeleton className="h-4 w-full mb-2 bg-contrast" />
        <Skeleton className="h-4 w-3/4 bg-contrast" />
      </div>
      <div>
        <Skeleton className="h-4 w-3/4 mb-4 bg-contrast" />
        <Skeleton className="h-4 w-full mb-2 bg-contrast" />
        <Skeleton className="h-4 w-3/4 mb-4 bg-contrast" />
      </div>
    </div>
  )
}

export default NotePreview
