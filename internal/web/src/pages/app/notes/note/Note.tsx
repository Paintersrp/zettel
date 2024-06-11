import React, { Suspense, useCallback, useState } from "react"
import { createRoute, useRouterState } from "@tanstack/react-router"

import { Loading } from "@/components/Loading"
import { appLayout } from "@/pages/app/App"

import { NoteEdit } from "./NoteEdit"
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

  // TODO: If no location state, fetch
  // TODO: Saves API Calls when coming from a link which already has the data

  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(note?.content ?? "")

  const onChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const onEdit = () => {
    setIsEditing(true)
  }

  const onCancel = () => {
    setIsEditing(false)
    setValue(note?.content ?? "")
  }

  // TODO: Refetch data on Confirm
  const onConfirm = () => {
    console.log("Updated content:", value)
    setIsEditing(false)
  }

  if (!note) {
    // TODO:
    return (
      <div className="w-full">
        <Loading />
      </div>
    )
  }

  return (
    <div className="w-full">
      <NoteTitle note={note} />
      <div className="w-full flex flex-col md:flex-row gap-4 rounded">
        <div className="w-full md:w-2/3 pb-4">
          <Suspense fallback={<Loading />}>
            {!isEditing ? (
              <NoteRead note={note} />
            ) : (
              <NoteEdit value={value!} onChange={onChange} />
            )}
          </Suspense>
        </div>
        <div className="w-full md:w-1/3 md:sticky md:top-4 md:h-full">
          <NoteSidebar
            note={note}
            isEditing={isEditing}
            onCancel={onCancel}
            onConfirm={onConfirm}
            onEditClick={onEdit}
          />
        </div>
      </div>
    </div>
  )
}

export default Note
