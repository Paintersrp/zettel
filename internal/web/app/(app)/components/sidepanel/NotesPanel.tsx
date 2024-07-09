import { useCallback, useMemo } from "react"

import { useIntersection } from "@/hooks/useIntersection"
import { useAuth } from "@/components/auth/provider"
import { Loading } from "@/components/Loading"
import { useGetNotesInfQuery } from "@/app/(app)/lib/useGetNotesInf"

import { NotesPanelList } from "./NotesPanelList"

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

  if (notesInfQuery.isLoading) {
    return <Loading />
  }

  if (!notes || notes.length === 0 || notes[0] === null) {
    return null
  }

  return (
    <div className="flex flex-col w-full py-2 sm:py-0">
      <NotesPanelList
        notes={notes}
        isFetchingNextPage={notesInfQuery.isFetchingNextPage}
        ref={intersection.ref}
      />
    </div>
  )
}

export default NotesPanel
