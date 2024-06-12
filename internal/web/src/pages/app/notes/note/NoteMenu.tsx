import { useCallback, type FC } from "react"

import { NoteWithDetails } from "@/types/app"
import { useMediaQuery } from "@/hooks/useMediaQuery"

import NoteMenuDrawer from "./NoteMenuDrawer"
import NoteMenuDropdown from "./NoteMenuDropdown"

interface NoteMenuProps {
  note: NoteWithDetails
}

const NoteMenu: FC<NoteMenuProps> = ({ note }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const onDelete = useCallback(() => {
    console.log("Delete click")
  }, [])

  if (isDesktop) {
    return <NoteMenuDropdown note={note} onDelete={onDelete} />
  }

  return <NoteMenuDrawer note={note} onDelete={onDelete} />
}

export { NoteMenu }
