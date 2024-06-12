import React, { useCallback } from "react"

import { NoteWithDetails } from "@/types/app"
import { useMediaQuery } from "@/hooks/useMediaQuery"

import NoteEditDrawer from "./NoteEditDrawer"
import NoteEditDropdown from "./NoteEditDropdown"

interface NoteEditMenuProps {
  note: NoteWithDetails
}

const NoteEditMenu: React.FC<NoteEditMenuProps> = ({ note }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const onSubmitEdit = useCallback(() => {
    console.log("Edit submit")
  }, [])

  const onSaveDraft = useCallback(() => {
    console.log("Saved draft")
  }, [])

  const onDelete = useCallback(() => {
    console.log("Delete click")
  }, [])

  if (isDesktop) {
    return (
      <NoteEditDropdown
        note={note}
        onSubmitEdit={onSubmitEdit}
        onSaveDraft={onSaveDraft}
        onDelete={onDelete}
      />
    )
  }

  return (
    <NoteEditDrawer
      note={note}
      onSubmitEdit={onSubmitEdit}
      onSaveDraft={onSaveDraft}
      onDelete={onDelete}
    />
  )
}

export default NoteEditMenu
