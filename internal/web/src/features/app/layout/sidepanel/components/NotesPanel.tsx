import { useCallback, useMemo } from "react"

import { useIntersection } from "@/hooks/useIntersection"

import { useGetNotesInfQuery } from "@/features/app/notes/api/getNotesInf"
import { useAuth } from "@/features/auth/providers"

import { PanelNoteList } from "./PanelNoteList"

export const NotesPanel = () => {
  const { user } = useAuth()

  if (!user?.active_vault) {
    return null
  }

  const { id: vaultId } = user.active_vault
  const notesInfQuery = useGetNotesInfQuery({
    id: vaultId,
    filter: "all",
    max: 20,
  })

  const handleIntersection = useCallback(() => {
    if (!notesInfQuery.isFetching) {
      notesInfQuery.fetchNextPage()
    }
  }, [notesInfQuery])

  const intersection = useIntersection({
    root: null,
    threshold: 0.2,
    onIntersect: handleIntersection,
  })

  const notes = useMemo(
    () => notesInfQuery.data?.pages.flatMap((page) => page.data.notes) ?? [],
    [notesInfQuery.data?.pages]
  )

  return (
    <div className="flex flex-col w-full py-2 sm:py-0">
      <PanelNoteList
        notes={notes}
        isFetchingNextPage={notesInfQuery.isFetchingNextPage}
        ref={intersection.ref}
      />
    </div>
  )
}

export default NotesPanel
