import { Suspense } from "react"

import { getNote } from "@/app/(app)/lib/getNote"

import { NoteMenu } from "./components/NoteMenu"
import { NoteRead } from "./components/NoteRead"
import { NoteTitle } from "./components/NoteTitle"

interface NoteProps {
  params: { id: string }
}

const Note = async ({ params }: NoteProps) => {
  const note = await getNote(params.id)

  if (!note) {
    return null
  }

  return (
    <div className="w-full max-w-full">
      <NoteTitle
        note={note}
        menu={
          <Suspense>
            <NoteMenu note={note} />
          </Suspense>
        }
      />
      <div className="w-full flex flex-col md:flex-row gap-4 flex-grow">
        <NoteRead note={note} key={note.id} />
      </div>
    </div>
  )
}

export default Note
