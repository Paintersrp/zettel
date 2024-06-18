import { useCallback, useState, type FC } from "react"

import { NoteWithDetails } from "@/types/app"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { ConfirmationModal } from "@/components/ConfirmationModel"

import NotesTableDrawer from "./NotesTableDrawer"
import { NotesTableDropdown } from "./NotesTableDropdown"

interface NotesTableMenuProps {
  note: NoteWithDetails
}

const NotesTableMenu: FC<NotesTableMenuProps> = ({ note }) => {
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
        <NotesTableDropdown
          note={note}
          onDelete={onConfirmOpen}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <NotesTableDrawer
          note={note}
          onDelete={onConfirmOpen}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  )
}

export { NotesTableMenu }
