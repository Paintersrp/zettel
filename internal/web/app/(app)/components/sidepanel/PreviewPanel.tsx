import { NoteWithDetails } from "@/types/app"

import NotePreview from "./NotePreview"

export const PreviewPanel = ({ note }: { note?: NoteWithDetails }) => {
  // TODO: No Note Found Display
  if (!note) return null

  return (
    <div className="w-full h-full">
      <NotePreview note={note} />
    </div>
  )
}

export default PreviewPanel
