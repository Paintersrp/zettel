import { memo } from "react"

import { NoteWithDetails } from "@/types/app"

import NoteInfo from "./NoteInfo"
import NotePreview from "./NotePreview"

const MemoizedNoteInfo = memo(NoteInfo)
const MemoizedNotePreview = memo(NotePreview)

interface NoteCardProps {
  note: NoteWithDetails
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div className="bg-contrast rounded shadow-md overflow-hidden flex flex-col">
      <div className="p-4 flex flex-col md:flex-row md:gap-4 md:justify-between flex-grow">
        <MemoizedNoteInfo note={note} />
        <MemoizedNotePreview note={note} />
      </div>
    </div>
  )
}

export default memo(NoteCard)
