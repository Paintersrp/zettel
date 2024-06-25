import { useCallback, useEffect, useMemo, useState, type FC } from "react"

import { useIntersection } from "@/hooks/useIntersection"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { formatVaultName } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { Heading } from "@/components/Heading"
import { useNotesInfQuery } from "@/features/app/notes/api/notesInf"
import { NoteList } from "@/features/app/notes/components/notes/NoteList"
import { NoteListMobile } from "@/features/app/notes/components/notes/NoteListMobile"
import { NoteListToolbar } from "@/features/app/notes/components/notes/NoteListToolbar"
import { NotePreview } from "@/features/app/notes/components/notes/NotePreview"
import { useAuth } from "@/features/auth/providers"

import { notesRoute } from "."

interface NotesProps {}

const Notes: FC<NotesProps> = () => {
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

  const infQuery = useNotesInfQuery(user!.active_vault!.id!, search.filter, 10)

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
      if (!infQuery.isFetching) infQuery.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desktopIntersection.entry, infQuery.fetchNextPage, infQuery.isFetching])

  useEffect(() => {
    if (mobileIntersection.entry?.isIntersecting) {
      if (!infQuery.isFetching) infQuery.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileIntersection.entry, infQuery.fetchNextPage, infQuery.isFetching])

  useEffect(() => {
    setSelectedNote(null)
  }, [search.filter])

  const notes = useMemo(
    () => infQuery.data?.pages.flatMap((page) => page.data.notes),
    [infQuery.data?.pages]
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
              query={infQuery}
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
            query={infQuery}
            notes={notes}
            ref={mobileIntersection.ref}
          />
        </div>
      )}
    </div>
  )
}

export default Notes
