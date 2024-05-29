import { FC, useEffect, useMemo, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { createRoute } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import axios from "@/lib/axios"
import { vaultQuery } from "@/lib/queries/vault"
import { formatVaultName } from "@/lib/utils"
import { Loading } from "@/components/Loading"
import { rootRoute } from "@/pages/root/Root"
import BaseLayout from "@/layouts/base/Base"

import NoteInfo from "./NoteInfo"
import NotePreview from "./NotePreview"

export const vaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vault/$id",
  component: () => <Vault />,
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(vaultQuery(opts.params.id, 1, 10)),
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

  const { data, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["notes-inf"],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get(
        `v1/api/vaults/${id}?page=${pageParam}&limit=10`
      )

      const nextPage = data.has_more ? pageParam + 1 : null
      const prevPage = pageParam !== 0 ? pageParam - 1 : null

      return { data, nextPage, prevPage }
    },
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage) {
        return lastPage.nextPage
      }
    },
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  if (!data) {
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

  return (
    <BaseLayout>
      <div className="pb-4 w-full">
        <h1 className="text-3xl font-bold pb-4 pt-2">
          Vault: {formatVaultName(data.pages[0].data.vault.name)}
        </h1>
        <div className="flex flex-col gap-4 w-full">
          {notes?.map((note: NoteWithDetails, index: number) => {
            if (index === notes.length - 1) {
              return (
                <div
                  ref={ref}
                  key={note.id}
                  className="bg-contrast rounded shadow-md overflow-hidden flex flex-col"
                >
                  <div className="p-4 flex flex-col md:flex-row md:gap-4 md:justify-between flex-grow">
                    <NoteInfo note={note} />
                    <NotePreview note={note} />
                  </div>
                </div>
              )
            } else {
              return (
                <div
                  key={note.id}
                  className="bg-contrast rounded shadow-md overflow-hidden flex flex-col"
                >
                  <div className="p-4 flex flex-col md:flex-row md:gap-4 md:justify-between flex-grow">
                    <NoteInfo note={note} />
                    <NotePreview note={note} />
                  </div>
                </div>
              )
            }
          })}
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
