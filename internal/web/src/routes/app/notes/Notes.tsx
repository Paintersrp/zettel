import { useCallback, useMemo } from "react"

import { useIntersection } from "@/hooks/useIntersection"
import { formatVaultName } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"
import { Loading } from "@/components/Loading"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"
import { useGetNotesInfQuery } from "@/features/app/notes/api/getNotesInf"
import { NoteList } from "@/features/app/notes/components/NoteList"
import { NoteListToolbar } from "@/features/app/notes/components/NoteListToolbar"
import { useAuth } from "@/features/auth/providers"

import { notesRoute } from "."

const Notes = () => {
  const search = notesRoute.useSearch()
  const { user } = useAuth()
  const sidePanel = useSidePanel()

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

  const handleNoteClick = useCallback(
    (note: NoteWithDetails) => {
      sidePanel.openPanel("preview", note.id.toString(), { note })
    },
    [sidePanel.openPanel]
  )

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

  if (!notes || notes.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col w-full h-full bg-accent">
      <div className="px-4 py-2 space-y-2">
        <Heading
          title={`${formattedVaultName} Notes`}
          description={`View and manage notes for vault ${formattedVaultName}.`}
        />
        <NoteListToolbar search={search} />
      </div>
      <Separator />
      <div className="flex-grow overflow-hidden">
        <NoteList
          query={notesInfQuery}
          notes={notes}
          search={search}
          handleNoteClick={handleNoteClick}
          ref={intersection.ref}
        />
      </div>
    </div>
  )
}

export default Notes
