import React from "react"

import { NoteWithDetails } from "@/types/app"
import { useMediaQuery } from "@/hooks/useMediaQuery"

import NoteEditDrawer from "./NoteEditDrawer"
import NoteEditDropdown from "./NoteEditDropdown"

interface NoteEditMenuProps {
  note: NoteWithDetails
}

const NoteEditMenu: React.FC<NoteEditMenuProps> = ({ note }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <NoteEditDropdown note={note} />
  }

  return <NoteEditDrawer note={note} />
}

export default NoteEditMenu
