import { useCallback, useMemo } from "react"

import { useIntersection } from "@/hooks/useIntersection"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { loadingLazy } from "@/lib/lazy"
import { formatVaultName } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"
import { useGetNotesInfQuery } from "@/features/app/notes/api/getNotesInf"
import { NoteList } from "@/features/app/notes/components/NoteList"
import { NoteListSkeleton } from "@/features/app/notes/components/NoteListSkeleton"
import { NoteListToolbarSkeleton } from "@/features/app/notes/components/NoteListToolbarSkeleton"
import { useAuth } from "@/features/auth/providers"

import { notesRoute } from "."

const NoteListToolbar = loadingLazy(
  () =>
    import("@/features/app/notes/components/NoteListToolbar").then(
      (module) => ({
        default: module.NoteListToolbar,
      })
    ),
  <NoteListToolbarSkeleton />
)

// 57.31kb 7/04/24
// 4.66kb 7/05/24 - Lazy Loading in NoteList + Toolbar with Skeleton Displays

const Notes = () => {
  const search = notesRoute.useSearch()
  const navigate = notesRoute.useNavigate()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const sidePanel = useSidePanel()
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

  const handleNoteClick = useCallback(
    (note: NoteWithDetails) => {
      if (isDesktop) {
        sidePanel.openPanel("preview", note.id.toString(), { note })
      } else {
        navigate({
          to: "/app/notes/$id",
          params: { id: note.id },
          state: { note },
        })
      }
    },
    [sidePanel.openPanel, isDesktop]
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

  if (!notes || notes.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col w-full h-full bg-accent">
      <div className="px-2 md:px-4 py-2 space-y-2">
        <Heading
          title={`${formattedVaultName} Notes`}
          description={`View and manage notes for vault ${formattedVaultName}.`}
        />
        <NoteListToolbar search={search} />
      </div>
      <Separator />
      <div className="flex-grow overflow-hidden">
        {notesInfQuery.isLoading || notesInfQuery.isRefetching ? (
          <NoteListSkeleton />
        ) : (
          <NoteList
            query={notesInfQuery}
            notes={notes}
            search={search}
            handleNoteClick={handleNoteClick}
            ref={intersection.ref}
          />
        )}
      </div>
    </div>
  )
}

export default Notes
