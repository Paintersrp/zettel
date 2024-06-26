import { FC } from "react"

import { NoteWithDetails } from "@/types/app"

import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"

interface NoteReadProps {
  note: NoteWithDetails
}

const NoteRead: FC<NoteReadProps> = ({ note }) => (
  <div
    id="read-view"
    className="flex flex-col gap-4 w-full justify-center items-center relative transition-opacity duration-200"
  >
    <div className="flex flex-col w-full">
      <div
        id="note-content"
        className="rounded bg-card border px-4 py-2 flex w-full"
      >
        <Prose variant="lg">
          <Markdown content={note.content} />
        </Prose>
      </div>
    </div>
  </div>
)

export { NoteRead }
