import { FC, useEffect, useMemo, useRef } from "react"
import { createRoute, redirect } from "@tanstack/react-router"

import { vaultQueryOptions } from "@/lib/queries/vault"
import { useVaultInfQuery } from "@/lib/queries/vault-inf"
import { formatVaultName } from "@/lib/utils"
import useIntersection from "@/hooks/useIntersection"
import { Loading } from "@/components/Loading"
import { useAuth } from "@/components/providers/AuthProvider"
import { appLayout } from "@/pages/app/App"

import NoteCard from "./NoteCard"

export const notesRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes",
  component: () => <Notes />,
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
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      vaultQueryOptions(opts.context.user!.active_vault!.id!, 1)
    ),
})

interface NotesProps {}

const Notes: FC<NotesProps> = () => {
  const initialData = notesRoute.useLoaderData()
  const { user } = useAuth()

  const lastPostRef = useRef<HTMLDivElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 0.2,
  })

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useVaultInfQuery(initialData, user!.active_vault!.id!)

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  if (isLoading) {
    return <Loading />
  }

  const notes = useMemo(
    () => data?.pages.flatMap((page) => page.data.notes),
    [data?.pages]
  )

  // TODO: Factor out vault from API return, as we already have the relevant vault data coming into this
  const vault = useMemo(
    () => data?.pages[0].data.vault,
    [data?.pages[0].data.vault]
  )

  return (
    <div className="py-4 w-full">
      <h1 className="text-3xl font-bold pb-4">{formatVaultName(vault.name)}</h1>
      <div className="flex flex-col gap-4 w-full">
        {notes.map((note, index) => (
          <div ref={index === notes.length - 1 ? ref : null} key={note.id}>
            <NoteCard note={note} />
          </div>
        ))}
        {isFetchingNextPage && <Loading className="mt-0 mb-10" />}
      </div>
    </div>
  )
}

export default Notes
