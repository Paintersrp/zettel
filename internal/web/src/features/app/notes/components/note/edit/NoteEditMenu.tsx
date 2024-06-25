import { useCallback, type FC } from "react"

import { useConfirmationModal } from "@/hooks/useConfirmationModal"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { useDeleteMutation } from "@/lib/mutations/common/delete"
import { NoteWithDetails } from "@/types/app"

import { ConfirmationModal } from "@/components/ConfirmationModal"

import { NoteEditDrawer } from "./NoteEditDrawer"
import { NoteEditDropdown } from "./NoteEditDropdown"

interface NoteEditMenuProps {
  note: NoteWithDetails
}

export const NoteEditMenu: FC<NoteEditMenuProps> = ({ note }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const menu = useReactiveOpen()
  const modal = useConfirmationModal()
  const deleteMutation = useDeleteMutation({ id: note.id, type: "notes" })

  const onSubmitEdit = useCallback(() => {
    console.log("Edit submit")
  }, [])

  const onSaveDraft = useCallback(() => {
    console.log("Saved draft")
  }, [])

  return (
    <>
      <ConfirmationModal
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
