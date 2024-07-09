import { FC, Suspense } from "react"

import { NoteWithDetails } from "@/types/app"
import { Loading } from "@/components/Loading"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"

import { NoteReadContainer } from "./NoteReadContainer"

interface NoteReadProps {
  note: NoteWithDetails
}

const NoteRead: FC<NoteReadProps> = ({ note }) => {
  return (
    <div className="flex w-full relative">
      <Suspense fallback={<Loading />}>
        <NoteReadContainer>
          <div
            id="note-content"
            className="rounded bg-card sm:px-4 sm:py-2 flex w-full xl:max-w-5xl xl:m-auto"
          >
            <Suspense fallback={<Loading />}>
              <Prose variant="lg" className="w-full flex p-2">
                <Markdown content={note.content} />
              </Prose>
            </Suspense>
          </div>
        </NoteReadContainer>
      </Suspense>
    </div>
  )
}

export { NoteRead }
