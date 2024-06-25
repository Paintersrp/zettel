import { useCallback, useEffect, useMemo, useState } from "react"

import { useIntersection } from "@/hooks/useIntersection"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { formatVaultName } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { Heading } from "@/components/Heading"
import { useGetNotesInfQuery } from "@/features/app/notes/api/getNotesInf"
import { NoteList } from "@/features/app/notes/components/NoteList"
import { NoteListMobile } from "@/features/app/notes/components/NoteListMobile"
import { NoteListToolbar } from "@/features/app/notes/components/NoteListToolbar"
import { NotePreview } from "@/features/app/notes/components/NotePreview"
import { useAuth } from "@/features/auth/providers"

import { notesRoute } from "."

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState<NoteWithDetails | null>(null)
  const search = notesRoute.useSearch()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { user } = useAuth()

  const desktopIntersection = useIntersection({
    root: null,
    threshold: 0.2,
  })
  const mobileIntersection = useIntersection({
    root: null,
    threshold: 0.2,
  })

  const notesInfQuery = useGetNotesInfQuery(
    user!.active_vault!.id!,
    search.filter,
    10
  )

  const handleNoteClick = useCallback(
    (note: NoteWithDetails) => {
      setSelectedNote(note)
    },
    [setSelectedNote]
  )

  const onDeselect = useCallback(() => {
    setSelectedNote(null)
  }, [setSelectedNote])

  useEffect(() => {
    if (desktopIntersection.entry?.isIntersecting) {
      if (!notesInfQuery.isFetching) notesInfQuery.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    desktopIntersection.entry,
    notesInfQuery.fetchNextPage,
    notesInfQuery.isFetching,
  ])

  useEffect(() => {
    if (mobileIntersection.entry?.isIntersecting) {
      if (!notesInfQuery.isFetching) notesInfQuery.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mobileIntersection.entry,
    notesInfQuery.fetchNextPage,
    notesInfQuery.isFetching,
  ])

  useEffect(() => {
    setSelectedNote(null)
  }, [search.filter])

  const notes = useMemo(
    () => notesInfQuery.data?.pages.flatMap((page) => page.data.notes),
    [notesInfQuery.data?.pages]
  )

  return (
    <div className="flex flex-col w-full py-2 sm:py-0">
      <div className="flex w-full items-center justify-between mb-4">
        <Heading
          title={`${formatVaultName(user!.active_vault!.name)} Notes`}
          description={`View and manage notes for vault ${formatVaultName(user!.active_vault!.name)}.`}
        />
      </div>
      {isDesktop ? (
        <div className="rounded w-full hidden md:flex md:bg-contrast md:border mb-4">
          <div className="p-2 w-full md:w-1/2 lg:w-1/3 md:border-r">
            <NoteListToolbar search={search} />
            <NoteList
              query={notesInfQuery}
              notes={notes}
              search={search}
              handleNoteClick={handleNoteClick}
              selectedNote={selectedNote}
              ref={desktopIntersection.ref}
            />
          </div>
          <div className="md:w-1/2 lg:w-2/3 p-2">
            <NotePreview note={selectedNote} onDeselect={onDeselect} />
          </div>
        </div>
      ) : (
        <div className="py-2 mb-4 md:py-0 md:mb-0 md:hidden">
          {/* TODO: Mobile - <NoteListToolbar search={search} /> */}
          <NoteListMobile
            query={notesInfQuery}
            notes={notes}
            ref={mobileIntersection.ref}
          />
        </div>
      )}
    </div>
  )
}

export default Notes
