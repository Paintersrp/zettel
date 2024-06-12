import React from "react"

import { NoteWithDetails } from "@/types/app"
import { useMediaQuery } from "@/hooks/useMediaQuery"

import NoteMenuDrawer from "./NoteMenuDrawer"
import NoteMenuDropdown from "./NoteMenuDropdown"

interface NoteMenuProps {
  note: NoteWithDetails
}

const NoteMenu: React.FC<NoteMenuProps> = ({ note }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <NoteMenuDropdown note={note} />
  }

  return <NoteMenuDrawer note={note} />
}

export default NoteMenu
