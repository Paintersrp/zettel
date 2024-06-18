import { useCallback, useEffect, useMemo, useState, type FC } from "react"

import { NoteWithDetails } from "@/types/app"
import { useVaultInfQuery } from "@/lib/queries/vault-inf"
import { formatVaultName } from "@/lib/utils"
import useIntersection from "@/hooks/useIntersection"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Skeleton } from "@/components/ui/Skeleton"
import { VaultIcon } from "@/components/icons"
import { Loading } from "@/components/Loading"
import { useAuth } from "@/components/providers/AuthProvider"

import { notesRoute } from "."
import NoteListItem, { NoteListItemSkeleton } from "./NoteListItem"
import NoteListItemMobile, {
  NoteListItemMobileSkeleton,
} from "./NoteListItemMobile"
import NotePreview from "./NotePreview"
import NotesToolbar from "./NotesToolbar"

interface NotesProps {}

const Notes: FC<NotesProps> = () => {
  const search = notesRoute.useSearch()
  const { user } = useAuth()

  const desktopIntersection = useIntersection({
    root: null,
    threshold: 0.2,
  })
  const mobileIntersection = useIntersection({
    root: null,
    threshold: 0.2,
  })

  const [selectedNote, setSelectedNote] = useState<NoteWithDetails | null>(null)

  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useVaultInfQuery(user!.active_vault!.id!, search.filter, 10)

  useEffect(() => {
    if (desktopIntersection.entry?.isIntersecting) {
      if (!isFetching) fetchNextPage()
    }
  }, [desktopIntersection.entry, fetchNextPage])

  useEffect(() => {
    if (mobileIntersection.entry?.isIntersecting) {
      if (!isFetching) fetchNextPage()
    }
  }, [mobileIntersection.entry, fetchNextPage])

  useEffect(() => {
    setSelectedNote(null)
  }, [search.filter])

  const handleNoteClick = (note: NoteWithDetails) => {
    setSelectedNote(note)
  }

  const onDeselect = useCallback(() => {
    setSelectedNote(null)
  }, [setSelectedNote])

  const renderSkeletons = (count: number, isMobile: boolean) => {
    return Array.from({ length: count }).map((_, index) =>
      isMobile ? (
        <NoteListItemMobileSkeleton key={`mobile-${index}`} />
      ) : (
        <NoteListItemSkeleton key={`desktop-${index}`} />
      )
    )
  }

  const notes = useMemo(
    () => data?.pages.flatMap((page) => page.data.notes),
    [data?.pages]
  )

  const vault = useMemo(
    () => data?.pages[0].data.vault,
    [data?.pages[0].data.vault]
  )

  return (
    <div className="flex flex-col w-full mt-2 sm:mt-0">
      <NotesToolbar filter={search.filter} />
      <div className="rounded w-full hidden md:flex md:bg-contrast md:border mb-4">
        <div className="p-2 w-full md:w-1/2 lg:w-1/3 md:border-r">
          <div className="flex gap-2 items-center py-2">
            <span className="size-7 text-primary">
              <VaultIcon />
            </span>
            {isLoading ? (
              <Skeleton className="h-8 w-1/4 mb-4 bg-contrast" />
            ) : (
              <h1 className="text-2xl font-bold">
                {formatVaultName(vault?.name!)}
              </h1>
            )}
          </div>
          {!isRefetching && !isLoading ? (
            <ScrollArea key={search.filter} className="h-[80vh]">
              {notes?.map((note, index) => (
                <div
                  ref={
                    index === notes.length - 1 ? desktopIntersection.ref : null
                  }
                  key={note.id}
                  onClick={() => handleNoteClick(note)}
                  className=""
                >
                  <NoteListItem
                    note={note}
                    isSelected={selectedNote?.id === note.id}
                  />
                </div>
              ))}
              {isFetchingNextPage && <Loading className="mt-0 mb-10" />}
            </ScrollArea>
          ) : (
            <ScrollArea className="h-[77vh]">
              {renderSkeletons(7, false)}
            </ScrollArea>
          )}
        </div>
        <div className="md:w-1/2 lg:w-2/3 p-2">
          <NotePreview note={selectedNote} onDeselect={onDeselect} />
        </div>
      </div>
      <div className="py-2 mb-4 md:py-0 md:mb-0 md:hidden">
        {!isRefetching && !isLoading ? (
          <div className="grid grid-cols-1 gap-2">
            {notes?.map((note, index) => (
              <div
                ref={index === notes.length - 1 ? mobileIntersection.ref : null}
                key={note.id}
              >
                <NoteListItemMobile note={note} />
              </div>
            ))}
            {isFetchingNextPage && <Loading className="mt-0 mb-10" />}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {renderSkeletons(7, true)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notes
