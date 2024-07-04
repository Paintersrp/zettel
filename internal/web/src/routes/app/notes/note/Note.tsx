import { useRouterState } from "@tanstack/react-router"

import { Loading } from "@/components/Loading"
import { useGetNoteQuery } from "@/features/app/note/api/getNote"
import { NoteMenu } from "@/features/app/note/components/NoteMenu"
import { NoteNotFound } from "@/features/app/note/components/NoteNotFound"
import { NoteRead } from "@/features/app/note/components/NoteRead"
import { NoteTitle } from "@/features/app/note/components/NoteTitle"

import { noteRoute } from "."

// 4.74kb 7/04/24

// TODO: lazy load NoteRead
// TODO: NoteRead LazyLoad Prose / Markdown

const Note = () => {
  const { note: routerNote } = useRouterState({
    select: (s) => s.location.state,
  })
  const { id } = noteRoute.useParams()
  const getNoteQuery = useGetNoteQuery({ id, note: routerNote })

  if (!routerNote && getNoteQuery.isLoading) {
    return <Loading className="w-full" />
  }

  const displayNote = routerNote || getNoteQuery.data

  if (!displayNote) {
    return <NoteNotFound />
  }

  return (
    <div className="w-full max-w-full">
      <NoteTitle note={displayNote} menu={<NoteMenu note={displayNote} />} />
      <div className="w-full flex flex-col md:flex-row gap-4 flex-grow">
        <NoteRead note={displayNote} key={displayNote.id} />
      </div>
    </div>
  )
}

export default Note
