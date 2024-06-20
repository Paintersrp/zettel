import { useCallback, useEffect, useMemo, useState, type FC } from "react"
import { Link } from "@tanstack/react-router"
import { CirclePlus, Table } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { useVaultInfQuery } from "@/lib/queries/vault-inf"
import { formatVaultName } from "@/lib/utils"
import useIntersection from "@/hooks/useIntersection"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { buttonVariants } from "@/components/ui/variants/button"
import { Heading } from "@/components/Heading"
import { Loading } from "@/components/Loading"
import { useAuth } from "@/components/providers/auth"
import { TabbedLinkItem, TabbedLinks } from "@/components/TabbedLinks"

import { notesRoute } from "."
import NoteListItem, { NoteListItemSkeleton } from "./NoteListItem"
import NoteListItemMobile, {
  NoteListItemMobileSkeleton,
} from "./NoteListItemMobile"
import NotePreview from "./NotePreview"

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
  }, [desktopIntersection.entry, fetchNextPage, isFetching])

  useEffect(() => {
    if (mobileIntersection.entry?.isIntersecting) {
      if (!isFetching) fetchNextPage()
    }
  }, [mobileIntersection.entry, fetchNextPage, isFetching])

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

  return (
    <div className="flex flex-col w-full mt-2 sm:mt-0">
      <div className="flex w-full items-center justify-between mb-4">
        <Heading
          title={`${formatVaultName(user!.active_vault!.name)} Notes`}
          description={`View and manage notes for vault ${formatVaultName(user!.active_vault!.name)}.`}
        />
      </div>
      <div className="rounded w-full hidden md:flex md:bg-contrast md:border mb-4">
        <div className="p-2 w-full md:w-1/2 lg:w-1/3 md:border-r">
          <div className="flex gap-2 items-center justify-between pb-2 px-1 h-12">
            <div className="space-x-1">
              <TooltipWrapper side="top" content="Table View">
                <Link
                  to="/notes/table"
                  search={{
                    filter: search.filter,
                  }}
                  className={buttonVariants({
                    size: "iconSm",
                    className: "hover:bg-page bg-contrast-hover group",
                  })}
                >
                  <span className="flex gap-2 items-center text-sm">
                    <Table className="group-hover:text-primary size-4" />
                    <span className="sr-only">Table View</span>
                  </span>
                </Link>
              </TooltipWrapper>
              <TooltipWrapper side="top" content="Create Note">
                <Link
                  to="/notes/create"
                  className={buttonVariants({
                    size: "iconSm",
                    className: "group hover:bg-page bg-contrast-hover",
                  })}
                >
                  <span className="flex gap-2 items-center text-sm text-default">
                    <CirclePlus className="group-hover:text-primary size-4" />
                    <span className="sr-only">Create Note</span>
                  </span>
                </Link>
              </TooltipWrapper>
            </div>

            <TabbedLinks>
              <TabbedLinkItem
                value="all"
                to="/notes"
                search={{ filter: "all" }}
              >
                All
              </TabbedLinkItem>
              <TabbedLinkItem
                value="untagged"
                to="/notes"
                search={{ filter: "untagged" }}
              >
                Untagged
              </TabbedLinkItem>
              <TabbedLinkItem
                value="orphans"
                to="/notes"
                search={{ filter: "orphans" }}
              >
                Orphans
              </TabbedLinkItem>
            </TabbedLinks>
          </div>
          {!isRefetching && !isLoading ? (
            <ScrollArea key={search.filter} className="h-[75vh]">
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
            <ScrollArea className="h-[75vh]">
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
