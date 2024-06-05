import React, { useCallback, useState } from "react"
import { rootRoute } from "@/root"
import { createRoute, useRouterState } from "@tanstack/react-router"

import BaseLayout, { baseLayout } from "@/layouts/base/Base"

import { NoteEdit } from "./NoteEdit"
import { NoteRead } from "./NoteRead"
import { NoteSidebar } from "./NoteSidebar"
import { NoteTitle } from "./NoteTitle"

export const noteRoute = createRoute({
  getParentRoute: () => baseLayout,
  path: "/note/$id",
  component: () => <Note />,
})

interface NoteProps {}

const Note: React.FC<NoteProps> = () => {
  const { note } = useRouterState({
    select: (s) => s.location.state,
  })

  // TODO: If no location state, fetch
  // TODO: Saves API Calls when coming from a link which already has the data

  if (!note) {
    // TODO:
    return <div>No note.</div>
  }

  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(note.content)

  const onChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const onEdit = () => {
    setIsEditing(true)
  }

  const onCancel = () => {
    setIsEditing(false)
    setValue(note.content)
  }

  // TODO: Refetch data on Confirm

  const onConfirm = () => {
    console.log("Updated content:", value)
    setIsEditing(false)
  }

  return (
    <BaseLayout>
      <div className="w-full">
        <NoteTitle note={note} />
        <div className="w-full flex flex-col md:flex-row gap-4 rounded">
          <div className="w-full md:w-3/4 pb-4">
            {!isEditing ? (
              <NoteRead note={note} />
            ) : (
              <NoteEdit value={value} onChange={onChange} />
            )}
          </div>
          <div className="w-full md:w-1/4 md:sticky md:top-4 md:h-full z-40">
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
    </BaseLayout>
  )
}

export default Note
