import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query"

import type { NoteWithDetails, VaultResponse } from "@/types/app"

import { NoteListMobile } from "./NoteListMobile"
import { NoteListToolbar } from "./NoteListToolbar"

interface NotesMobileViewProps {
  infQuery: UseInfiniteQueryResult<InfiniteData<VaultResponse, unknown>, Error>
  notes: NoteWithDetails[]
  search: { filter: string }
  intersectionRef: (element: HTMLElement | null) => void
}

export const NotesMobileView: React.FC<NotesMobileViewProps> = ({
  infQuery,
  notes,
  search,
  intersectionRef,
}) => (
  <div className="py-2 mb-4 md:py-0 md:mb-0 md:hidden">
    <NoteListToolbar search={search} />
    <NoteListMobile query={infQuery} notes={notes} ref={intersectionRef} />
  </div>
)

export default NotesMobileView
