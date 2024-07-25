"use client"

import type { FC } from "react"

import type { NoteWithDetails } from "@/types/app"
import { useDeleteMutation } from "@/lib/common/client/useDeleteMutation"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { ConfirmModal } from "@/components/confirmModal/ConfirmModal"
import { useConfirmModal } from "@/components/confirmModal/useConfirmModal"

import { NoteMenuDrawer } from "./NoteMenuDrawer"
import { NoteMenuDropdown } from "./NoteMenuDropdown"

interface NoteMenuProps {
  note: NoteWithDetails
}

const NoteMenu: FC<NoteMenuProps> = ({ note }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const menu = useReactiveOpen()
  const modal = useConfirmModal()
  const deleteMutation = useDeleteMutation({ id: note.id, type: "notes" })

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
