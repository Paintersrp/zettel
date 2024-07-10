import { FC } from "react"

import { NoteWithDetails } from "@/types/app"

import { NoteInformation } from "./NoteInformation"

interface NoteInformationPanelProps {
  note?: NoteWithDetails
}

// TODO: Combine with NoteInformation
// TODO: Add note title and other context, just in case

export const NoteInformationPanel: FC<NoteInformationPanelProps> = ({
  note,
}) => {
  if (!note) {
    return <div>No note data...</div>
  }

  return <NoteInformation note={note} />
}

export default NoteInformationPanel
