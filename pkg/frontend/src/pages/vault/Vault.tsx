import { FC, useEffect, useMemo, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { createRoute } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"

import { vaultInfQuery, vaultQuery } from "@/lib/queries/vault"
import { formatVaultName } from "@/lib/utils"
import { Loading } from "@/components/Loading"
import { rootRoute } from "@/pages/root/Root"
import NoteCard from "@/pages/vault/NoteCard"
import BaseLayout from "@/layouts/base/Base"

export const vaultRoute = createRoute({
  getParentRoute: () => rootRoute,
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
    threshold: 0.1,
  })

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(vaultInfQuery(initialData, id))

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  if (isLoading) {
    return (
      <BaseLayout>
        <Loading />
      </BaseLayout>
    )
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
    <BaseLayout>
      <div className="pb-4 w-full">
        <h1 className="text-3xl font-bold pb-4 pt-2">
          Vault: {formatVaultName(vault.name)}
        </h1>
        <div className="flex flex-col gap-4 w-full">
          {notes?.map((note, index) => (
            <div ref={index === notes.length - 1 ? ref : null} key={note.id}>
              <NoteCard note={note} />
            </div>
          ))}
          {isFetchingNextPage && (
            <li className="flex justify-center">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </li>
          )}
        </div>
      </div>
    </BaseLayout>
  )
}

export default Vault
