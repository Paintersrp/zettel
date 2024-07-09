"use client"

import type { FC } from "react"

import type { NoteWithDetails } from "@/types/app"
import { useDeleteMutation } from "@/lib/mutations/common/delete"
import { useConfirmationModal } from "@/hooks/useConfirmationModal"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { ConfirmationModal } from "@/components/ConfirmationModal"

import { NoteMenuDrawer } from "./NoteMenuDrawer"
import { NoteMenuDropdown } from "./NoteMenuDropdown"

interface NoteMenuProps {
  note: NoteWithDetails
}

const NoteMenu: FC<NoteMenuProps> = ({ note }) => {
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
        <NoteMenuDropdown
          note={note}
          onDelete={modal.onOpen}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      ) : (
        <NoteMenuDrawer
          note={note}
          onDelete={modal.onOpen}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      )}
    </>
  )
}

export { NoteMenu }
