import { FC } from "react"

import { NoteWithDetails } from "@/types/app"
import { MarkdownIcon } from "@/components/icons"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"

interface NoteAltPreviewProps {
  note: NoteWithDetails | null
}

const NoteAltPreview: FC<NoteAltPreviewProps> = ({ note }) => {
  return (
    <div>
      <div className="flex gap-2 items-center p-2">
        <span className="size-8 text-primary">
          <MarkdownIcon />
        </span>
        <h1 className="text-2xl font-bold">Note Preview</h1>
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
          <div className="px-4 py-6 font-semibold">No Note Selected</div>
        )}
      </div>
    </div>
  )
}

export default NoteAltPreview
