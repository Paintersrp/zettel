import { FC } from "react"

import { NoteWithDetails } from "@/types/app"
import { MarkdownIcon } from "@/components/icons"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"

interface NotePreviewProps {
  note: NoteWithDetails
}

const NotePreview: FC<NotePreviewProps> = ({ note }) => {
  return (
    <div className="hidden md:w-1/2 md:block md:flex-grow">
      <div className="flex gap-1 items-center mb-2 pb-1 border-b">
        <span className="size-6 mr-1 text-primary">
          <MarkdownIcon />
        </span>
        <h3 className="font-semibold text-lg">Preview</h3>
      </div>
      <div className="border rounded bg-page md:flex-grow md:overflow-auto md:max-h-80 md:px-1">
        <Prose>
          <Markdown content={note.content} />
        </Prose>
      </div>
    </div>
  )
}

export default NotePreview
