import { FC, Suspense } from "react"

import { Loading } from "@/components/Loading"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"
import { getNote } from "@/app/(app)/lib/getNote"

import { NoteReadContainer } from "./NoteReadContainer"

interface NoteReadProps {
  id: string
}

const NoteRead: FC<NoteReadProps> = async ({ id }) => {
  const note = await getNote(id)

  return (
    <div className="flex w-full relative">
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
    </div>
  )
}

export { NoteRead }
