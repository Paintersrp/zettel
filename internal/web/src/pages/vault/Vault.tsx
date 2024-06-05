import { FC, useEffect, useMemo, useRef } from "react"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { createRoute } from "@tanstack/react-router"

import { vaultQuery } from "@/lib/queries/vault"
import { vaultInfQuery } from "@/lib/queries/vault-inf"
import { formatVaultName } from "@/lib/utils"
import useIntersection from "@/hooks/useIntersection"
import { Loading } from "@/components/Loading"
import NoteCard from "@/pages/vault/VaultNoteCard"
import { baseLayout } from "@/layouts/base/Base"

export const vaultRoute = createRoute({
  getParentRoute: () => baseLayout,
  path: "/vault/$id",
  component: () => <Vault />,
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(vaultQuery(opts.params.id, 1)),
})

interface VaultProps {}

const Vault: FC<VaultProps> = () => {
  const initialData = vaultRoute.useLoaderData()
  const { id } = vaultRoute.useParams()

  const lastPostRef = useRef<HTMLDivElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 0.2,
  })

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(vaultInfQuery(initialData, id))

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
    <div className="pb-4 w-full">
      <h1 className="text-3xl font-bold pb-4 pt-2">
        Vault: {formatVaultName(vault.name)}
      </h1>
      <div className="flex flex-col gap-4 w-full">
        {notes.map((note, index) => (
          <div ref={index === notes.length - 1 ? ref : null} key={note.id}>
            <NoteCard note={note} />
          </div>
        ))}
        {isFetchingNextPage && <Loading className="mt-0" />}
      </div>
    </div>
  )
}

export default Vault
