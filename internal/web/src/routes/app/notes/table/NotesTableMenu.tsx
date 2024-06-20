import { type FC } from "react"

import { NoteWithDetails } from "@/types/app"
import { useDeleteMutation } from "@/lib/mutations/delete"
import { useConfirmationModal } from "@/hooks/useConfirmationModal"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { ConfirmationModal } from "@/components/ConfirmationModal"

import NotesTableDrawer from "./NotesTableDrawer"
import { NotesTableDropdown } from "./NotesTableDropdown"

interface NotesTableMenuProps {
  note: NoteWithDetails
}

const NotesTableMenu: FC<NotesTableMenuProps> = ({ note }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const menu = useReactiveOpen()
  const modal = useConfirmationModal()
  const deleteMutation = useDeleteMutation({ id: note.id, type: "notes" })

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
        <NotesTableDropdown
          note={note}
          onDelete={modal.onOpen}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      ) : (
        <NotesTableDrawer
          note={note}
          onDelete={modal.onOpen}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      )}
    </>
  )
}

export { NotesTableMenu }
