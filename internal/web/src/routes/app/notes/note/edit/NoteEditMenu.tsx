import React, { useCallback, useState } from "react"

import { NoteWithDetails } from "@/types/app"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { ConfirmationModal } from "@/components/ConfirmationModal"

import NoteEditDrawer from "./NoteEditDrawer"
import NoteEditDropdown from "./NoteEditDropdown"

interface NoteEditMenuProps {
  note: NoteWithDetails
}

const NoteEditMenu: React.FC<NoteEditMenuProps> = ({ note }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { open, setOpen } = useReactiveOpen()
  const { open: confirmOpen, setOpen: setConfirmOpen } = useReactiveOpen()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = useCallback(() => {
    setIsLoading(true)
    console.log("Delete click")
    setIsLoading(false)
  }, [])

  const onConfirmOpen = useCallback(() => {
    setConfirmOpen(true)
  }, [])

  const onConfirmClose = useCallback(() => {
    setConfirmOpen(false)
  }, [])

  const onSubmitEdit = useCallback(() => {
    console.log("Edit submit")
  }, [])

  const onSaveDraft = useCallback(() => {
    console.log("Saved draft")
  }, [])

  return (
    <>
      <ConfirmationModal
        open={confirmOpen}
        onClose={onConfirmClose}
        isLoading={isLoading}
        onConfirm={onDelete}
        title="Are you sure you want to delete this note?"
      />
      {isDesktop ? (
        <NoteEditDropdown
          note={note}
          onSubmitEdit={onSubmitEdit}
          onSaveDraft={onSaveDraft}
          onDelete={onConfirmOpen}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <NoteEditDrawer
          note={note}
          onSubmitEdit={onSubmitEdit}
          onSaveDraft={onSaveDraft}
          onDelete={onConfirmOpen}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  )
}

export default NoteEditMenu
