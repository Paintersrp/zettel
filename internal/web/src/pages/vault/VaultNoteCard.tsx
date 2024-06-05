import { memo } from "react"

import { NoteWithDetails } from "@/types/app"

import VaultNoteInfo from "./VaultNoteInfo"
import VaultNotePreview from "./VaultNotePreview"

interface VaultNoteCardProps {
  note: NoteWithDetails
}

const VaultNoteCard: React.FC<VaultNoteCardProps> = ({ note }) => {
  return (
    <div className="bg-contrast rounded shadow-md overflow-hidden flex flex-col">
      <div className="p-4 flex flex-col md:flex-row md:gap-4 md:justify-between flex-grow">
        <VaultNoteInfo note={note} />
        <VaultNotePreview note={note} />
      </div>
    </div>
  )
}

export default memo(VaultNoteCard)
