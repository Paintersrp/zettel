import { Suspense } from "react"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

import { VaultResponse } from "@/types/app"
import { getSession } from "@/lib/auth/actions/session"
import { getNotesInfinite } from "@/lib/note/queries/getNotesInfinite"
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"

import NoteListContainer from "./components/NoteListContainer"
import NoteListSkeleton from "./components/NoteListSkeleton"
import NoteListToolbar from "./components/NoteListToolbar"

interface NotesProps {
  searchParams: { filter: string }
}

const Notes = async ({ searchParams }: NotesProps) => {
  const user = await getSession()
  const queryClient = new QueryClient()
  const filter = searchParams.filter ?? "all"

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["notes", filter, 10],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      if (user?.active_vault) {
        return await getNotesInfinite(
          user?.active_vault!,
          pageParam,
          filter,
          10
        )
      }
      return { nextPage: null } as VaultResponse
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: VaultResponse) => {
      if (lastPage.nextPage) {
        return lastPage.nextPage
      }
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col w-full bg-accent max-h-[calc(100%-9rem]">
        <div className="px-2 md:px-4 py-2 space-y-2">
          <Heading
            title="Vault Notes"
            description="View and manage notes for active vault."
          />

          <NoteListToolbar filter={searchParams.filter ?? "all"} />
        </div>
        <Separator />
        <div className="flex-grow overflow-hidden">
          <Suspense fallback={<NoteListSkeleton />}>
            <NoteListContainer />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default Notes
