import { useCallback, useEffect, useMemo, useState } from "react"

import { useIntersection } from "@/hooks/useIntersection"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { formatVaultName } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { Heading } from "@/components/Heading"
import { useGetNotesInfQuery } from "@/features/app/notes/api/getNotesInf"
import { NotesDesktopView } from "@/features/app/notes/components/NotesDesktopView"
import { NotesMobileView } from "@/features/app/notes/components/NotesMobileView"
import { useAuth } from "@/features/auth/providers"

import { notesRoute } from "."

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState<NoteWithDetails | null>(null)
  const search = notesRoute.useSearch()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { user } = useAuth()

  if (!user?.active_vault) {
    return null
  }

  const { id: vaultId, name: vaultName } = user.active_vault
  const formattedVaultName = formatVaultName(vaultName)

  const notesInfQuery = useGetNotesInfQuery({
    id: vaultId,
    filter: search.filter,
    max: 10,
  })

  const handleNoteClick = useCallback((note: NoteWithDetails) => {
    setSelectedNote(note)
  }, [])

  const onDeselect = useCallback(() => {
    setSelectedNote(null)
  }, [])

  const handleIntersection = useCallback(() => {
    if (!notesInfQuery.isFetching) {
      notesInfQuery.fetchNextPage()
    }
  }, [notesInfQuery])

  const desktopIntersection = useIntersection({
    root: null,
    threshold: 0.2,
    onIntersect: handleIntersection,
  })

  const mobileIntersection = useIntersection({
    root: null,
    threshold: 0.2,
    onIntersect: handleIntersection,
  })

  useEffect(() => {
    setSelectedNote(null)
  }, [search.filter])

  const notes = useMemo(
    () => notesInfQuery.data?.pages.flatMap((page) => page.data.notes) ?? [],
    [notesInfQuery.data?.pages]
  )

  return (
    <div className="flex flex-col w-full py-2 sm:py-0">
      <div className="flex w-full items-center justify-between mb-4">
        <Heading
          title={`${formattedVaultName} Notes`}
          description={`View and manage notes for vault ${formattedVaultName}.`}
        />
      </div>
      {isDesktop ? (
        <NotesDesktopView
          infQuery={notesInfQuery}
          notes={notes}
          search={search}
          handleNoteClick={handleNoteClick}
          selectedNote={selectedNote}
          onDeselect={onDeselect}
          intersectionRef={desktopIntersection.ref}
        />
      ) : (
        <NotesMobileView
          infQuery={notesInfQuery}
          notes={notes}
          search={search}
          intersectionRef={mobileIntersection.ref}
        />
      )}
    </div>
  )
}

export default Notes
