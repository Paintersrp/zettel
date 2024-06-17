import { useState } from "react"
import { Row } from "@tanstack/react-table"

import { NoteWithDetails } from "@/types/app"
import { ConfirmationModal } from "@/components/ConfirmationModel"

import { notesTableRoute } from "."
import { NotesTableDropdown } from "./NotesTableDropdown"

interface NotesRowActionsProps<TData> {
  row: Row<TData>
}

export function NotesRowActions<TData>({ row }: NotesRowActionsProps<TData>) {
  const navigate = notesTableRoute.useNavigate()
  const note = row.original as NoteWithDetails

  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onDelete = () => {
    try {
      setIsLoading(true)
      console.log("Delete")
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  const onEdit = () => {
    try {
      setIsLoading(true)
      navigate({
        to: "/notes/$id/edit",
        params: { id: note.id.toString() },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <ConfirmationModal
        open={open}
        onClose={onClose}
        isLoading={isLoading}
        onConfirm={onDelete}
      />

      {/* Render returned Action Dropdown */}
      <NotesTableDropdown onOpen={onOpen} onEdit={onEdit} />
    </>
  )
}
