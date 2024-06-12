import React from "react"
import { createRoute, useRouterState } from "@tanstack/react-router"

import { useNoteQuery } from "@/lib/queries/note"
import { Loading } from "@/components/Loading"
import { appLayout } from "@/pages/app/App"

import { NoteMenu } from "./NoteMenu"
import { NoteRead } from "./NoteRead"
import { NoteSidebar } from "./NoteSidebar"
import { NoteTitle } from "./NoteTitle"

export const noteRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "notes/$id",
  component: () => <Note />,
})

interface NoteProps {}

const Note: React.FC<NoteProps> = () => {
  const { note } = useRouterState({
    select: (s) => s.location.state,
  })

  const { id } = noteRoute.useParams()
  const { data: queryNote, isLoading } = useNoteQuery(Number(id), note)

  if (!note && isLoading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    )
  }

  const displayNote = note || queryNote

  if (!displayNote) {
    return <div>Note not found</div>
  }

  return (
    <div className="w-full pt-2 sm:pt-0">
      <NoteTitle note={displayNote} menu={<NoteMenu note={displayNote} />} />
      <div className="w-full flex flex-col md:flex-row gap-4 rounded">
        <div className="w-full md:w-2/3 pb-4">
          <NoteRead note={displayNote} />
        </div>
        <div className="w-full md:w-1/3 md:sticky md:top-20 md:h-full">
          <NoteSidebar note={displayNote} />
        </div>
      </div>
    </div>
  )
}

export default Note
