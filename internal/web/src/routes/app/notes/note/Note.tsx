import type { FC } from "react"
import { useRouterState } from "@tanstack/react-router"

import { Loading } from "@/components/Loading"
import { useGetNoteQuery } from "@/features/app/notes/api/getNote"
import { NoteInformation } from "@/features/app/notes/components/note/NoteInformation"
import { NoteMenu } from "@/features/app/notes/components/note/NoteMenu"
import { NoteRead } from "@/features/app/notes/components/note/NoteRead"
import { NoteTitle } from "@/features/app/notes/components/note/NoteTitle"

import { noteRoute } from "."

interface NoteProps {}

const Note: FC<NoteProps> = () => {
  const { note } = useRouterState({
    select: (s) => s.location.state,
  })

  const { id } = noteRoute.useParams()
  const getNoteQuery = useGetNoteQuery(Number(id), note)

  if (!note && getNoteQuery.isLoading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    )
  }

  const displayNote = note || getNoteQuery.data

  // TODO: Note Not Found Display
  if (!displayNote) {
    return <div>Note not found</div>
  }

  return (
    <div className="w-full pt-2 sm:pt-0">
      <NoteTitle note={displayNote} menu={<NoteMenu note={displayNote} />} />
      <div className="w-full flex flex-col  md:flex-row gap-4 rounded">
        <div className="w-full md:w-2/3 lg:w-3/4 pb-4">
          <NoteRead note={displayNote} />
        </div>
        <div className="w-full hidden md:flex md:w-1/3 lg:w-1/4 md:sticky md:top-[6.75rem] md:h-full">
          <NoteInformation note={displayNote} />
        </div>
      </div>
    </div>
  )
}

export default Note
