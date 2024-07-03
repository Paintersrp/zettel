import { NoteWithDetails } from "@/types/app"

import NotePreview from "@/features/app/notes/components/NotePreview"

export const PreviewPanel = ({ note }: { note?: NoteWithDetails }) => {
  if (!note) return null

  return (
    <div className="h-full">
      <NotePreview note={note} />
    </div>
  )
}

export default PreviewPanel
