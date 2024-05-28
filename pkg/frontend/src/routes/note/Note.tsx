import React, { useCallback, useState } from "react"
import BaseLayout from "@/layouts/base/Base"
import { useLocation } from "react-router-dom"

import { NoteWithDetails } from "@/types/app"

import { Edit } from "./Edit"
import { Read } from "./Read"
import { Sidebar } from "./Sidebar"
import { Title } from "./Title"

interface NoteRouteProps {}

const NoteRoute: React.FC<NoteRouteProps> = () => {
  const location = useLocation()
  const note: NoteWithDetails = location.state

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
        <Title note={note} />
        <div className="w-full flex flex-col md:flex-row gap-4 rounded">
          <div className="w-full md:w-3/4 pb-4">
            {!isEditing ? (
              <Read note={note} />
            ) : (
              <Edit value={value} onChange={onChange} />
            )}
          </div>
          <div className="w-full md:w-1/4 md:sticky md:top-4 md:h-full z-40">
            <Sidebar
              note={note}
              isEditing={isEditing}
              onCancel={onCancel}
              onConfirm={onConfirm}
              onEditClick={onEdit}
            />
          </div>
        </div>
      </div>
      <link rel="stylesheet" href="/styles/editor.css" />
    </BaseLayout>
  )
}

export default NoteRoute
