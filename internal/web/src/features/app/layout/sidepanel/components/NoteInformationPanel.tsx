import { FC } from "react"

import { NoteWithDetails } from "@/types/app"

import { NoteInformation } from "@/features/app/note/components/NoteInformation"

interface NoteInformationPanelProps {
  note?: NoteWithDetails
}

export const NoteInformationPanel: FC<NoteInformationPanelProps> = ({
  note,
}) => {
  if (!note) {
    return <div>No note data...</div>
  }

  return (
    <div className="p-2">
      <NoteInformation note={note} />
    </div>
  )
}

export default NoteInformationPanel
