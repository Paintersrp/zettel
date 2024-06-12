import { useEffect, useMemo, useRef, useState, type FC } from "react"
import { createRoute, Link, redirect } from "@tanstack/react-router"
import { CirclePlus } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import {
  NotesSearch,
  NotesSearchFilterOptions,
  vaultQueryOptions,
} from "@/lib/queries/vault"
import { useVaultInfQuery } from "@/lib/queries/vault-inf"
import { formatVaultName } from "@/lib/utils"
import useIntersection from "@/hooks/useIntersection"
import { buttonVariants } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { VaultIcon } from "@/components/icons"
import { Loading } from "@/components/Loading"
import { useAuth } from "@/components/providers/AuthProvider"
import { TabbedLinkItem, TabbedLinks } from "@/components/TabbedLinks"
import { appLayout } from "@/pages/app/App"

import NoteAltPreview from "./NoteAltPreview"
import NoteListItem from "./NoteListItem"

export const notesAltRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes/alt",
  component: () => <NotesAlt />,
  beforeLoad: ({ context, location }) => {
    if (context.user) {
      if (!context.user.active_vault) {
        // TODO: Vault Select?
        throw redirect({
          to: "/vault/create",
        })
      }
    } else {
      throw redirect({
        to: `/login`,
        search: {
          redirect: location.href,
        },
      })
    }
  },
  validateSearch: (search: Record<string, unknown>): NotesSearch => {
    return {
      filter: (search.filter as NotesSearchFilterOptions) || "all",
    }
  },
  loaderDeps: ({ search: { filter } }) => ({ filter }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      vaultQueryOptions(
        opts.context.user!.active_vault!.id!,
        1,
        opts.deps.filter
      )
    ),
})

interface NotesAltProps {}

const NotesAlt: FC<NotesAltProps> = () => {
  const initialData = notesAltRoute.useLoaderData()
  const search = notesAltRoute.useSearch()
  const { user } = useAuth()
  const lastPostRef = useRef<HTMLDivElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 0.2,
  })
  const {
    data,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useVaultInfQuery(initialData, user!.active_vault!.id!, search.filter, 10)
  const [selectedNote, setSelectedNote] = useState<NoteWithDetails | null>(
    initialData.data.notes[0]
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  useEffect(() => {
    refetch()
    setSelectedNote(null)
  }, [search, refetch])

  if (isLoading) {
    return <Loading />
  }

  const notes = useMemo(
    () => data?.pages.flatMap((page) => page.data.notes),
    [data?.pages]
  )

  const vault = useMemo(
    () => data?.pages[0].data.vault,
    [data?.pages[0].data.vault]
  )

  const handleNoteClick = (note: NoteWithDetails) => {
    setSelectedNote(note)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="pb-2 flex items-center justify-between">
        <TabbedLinks>
          <TabbedLinkItem
            value="all"
            to="/notes/alt"
            search={{ filter: "all" }}
          >
            All
          </TabbedLinkItem>
          <TabbedLinkItem
            value="untagged"
            to="/notes/alt"
            search={{ filter: "untagged" }}
          >
            Untagged
          </TabbedLinkItem>
          <TabbedLinkItem
            value="orphans"
            to="/notes/alt"
            search={{ filter: "orphans" }}
          >
            Orphans
          </TabbedLinkItem>
        </TabbedLinks>
        {/* TODO: Page Link to Create Note when Available */}
        <Link
          to="/notes"
          className={buttonVariants({ size: "sm", variant: "outline" })}
        >
          <span className="flex gap-2 items-center text-sm">
            <CirclePlus className="size-4 text-primary" />
            Create Note
          </span>
        </Link>
      </div>
      <div className="rounded w-full hidden md:flex md:bg-contrast md:border mb-4">
        <div className="p-2 w-full md:w-1/2 lg:w-1/3 md:border-r">
          <div className="flex gap-2 items-center py-2">
            <span className="size-7 text-primary">
              <VaultIcon />
            </span>
            <h1 className="text-2xl font-bold">
              {formatVaultName(vault.name)}
            </h1>
          </div>
          {!isRefetching ? (
            <ScrollArea key={search.filter} className="h-[77vh]">
              {notes.map((note, index) => (
                <div
                  ref={index === notes.length - 1 ? ref : null}
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
            <div className="h-[77vh]">
              <Loading className="mt-0 mb-10 items-start" />
            </div>
          )}
        </div>
        <div className="md:w-1/2 lg:w-2/3 p-2">
          <NoteAltPreview note={selectedNote} />
        </div>
      </div>
      <div className="py-2 md:hidden">Mobile Grid Display</div>
    </div>
  )
}
export default NotesAlt
