import type { FC } from "react"
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query"

import type { NoteWithDetails, VaultResponse } from "@/types/app"

import { NoteList } from "./NoteList"
import { NoteListToolbar } from "./NoteListToolbar"
import { NotePreview } from "./NotePreview"

interface NotesDesktopViewProps {
  infQuery: UseInfiniteQueryResult<InfiniteData<VaultResponse, unknown>, Error>
  notes: NoteWithDetails[]
  search: { filter: string }
  handleNoteClick: (note: NoteWithDetails) => void
  selectedNote: NoteWithDetails | null
  onDeselect: () => void
  intersectionRef: (element: HTMLElement | null) => void
}

export const NotesDesktopView: FC<NotesDesktopViewProps> = ({
  infQuery,
  notes,
  search,
  handleNoteClick,
  selectedNote,
  onDeselect,
  intersectionRef,
}) => (
  <div className="rounded w-full hidden md:flex md:bg-contrast md:border mb-4">
    <div className="p-2 w-full md:w-1/2 lg:w-1/3 md:border-r">
      <NoteListToolbar search={search} />
      <NoteList
        query={infQuery}
        notes={notes}
        search={search}
        handleNoteClick={handleNoteClick}
        selectedNote={selectedNote}
        ref={intersectionRef}
      />
    </div>
    <div className="md:w-1/2 lg:w-2/3 p-2">
      <NotePreview note={selectedNote} onDeselect={onDeselect} />
    </div>
  </div>
)

export default NotesDesktopView
