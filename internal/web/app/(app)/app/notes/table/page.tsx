import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

import { getSession } from "@/lib/auth/actions/session"
import { getNotes } from "@/lib/note/queries/getNotes"
import { Heading } from "@/components/Heading"

import NotesTableContainer from "./components/NotesTableContainer"

interface NotesTableProps {
  searchParams: { filter?: string }
}

const NotesTable = async ({ searchParams }: NotesTableProps) => {
  const user = await getSession()
  const queryClient = new QueryClient()
  const filter = searchParams.filter ?? "all"

  await queryClient.prefetchQuery({
    queryFn: async () => {
      if (!user?.active_vault) return { notes: [], count: 0 }

      return await getNotes(user?.active_vault, 0, 0, filter)
    },
    queryKey: ["vault-notes", "table", 0, filter],
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full flex-grow bg-accent">
        <div className="space-y-2 px-4 py-2">
          <Heading title="Notes Table" description="Manage notes for vault" />
        </div>

        <div className="w-full flex flex-col">
          <NotesTableContainer filter={searchParams.filter ?? "all"} />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default NotesTable
