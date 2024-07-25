"use client"

import { useCallback, type FC } from "react"

import { NoteWithDetails } from "@/types/app"
import { useDeleteMutation } from "@/lib/common/client/useDeleteMutation"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { ConfirmModal } from "@/components/confirmModal/ConfirmModal"
import { useConfirmModal } from "@/components/confirmModal/useConfirmModal"

import { NoteEditDrawer } from "./NoteEditDrawer"
import { NoteEditDropdown } from "./NoteEditDropdown"

interface NoteEditMenuProps {
  note: NoteWithDetails
}

export const NoteEditMenu: FC<NoteEditMenuProps> = ({ note }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const menu = useReactiveOpen()
  const modal = useConfirmModal()
  const deleteMutation = useDeleteMutation({ id: note.id, type: "notes" })

  const onSubmitEdit = useCallback(() => {
    console.log("Edit submit")
  }, [])

  const onSaveDraft = useCallback(() => {
    console.log("Saved draft")
  }, [])

  return (
    <>
      <ConfirmModal
        open={modal.open}
        onClose={modal.onClose}
        isLoading={deleteMutation.isPending}
        onConfirm={deleteMutation.mutate}
        title="Are you sure you want to delete this note?"
      />
      {isDesktop ? (
        <NoteEditDropdown
          note={note}
          onSubmitEdit={onSubmitEdit}
          onSaveDraft={onSaveDraft}
          onDelete={modal.onOpen}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      ) : (
        <NoteEditDrawer
          note={note}
          onSubmitEdit={onSubmitEdit}
          onSaveDraft={onSaveDraft}
          onDelete={modal.onOpen}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      )}
    </>
  )
}

export default NoteEditMenu
