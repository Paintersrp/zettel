import { useInfiniteQuery } from "@tanstack/react-query"

import type { VaultResponse } from "@/types/app"
import { getNotesInfinite } from "@/lib/note/queries/getNotesInfinite"

type GetNotesInfOptions = {
  id: number
  filter: string
  max?: number
}

const getNotesInfQueryOptions = ({ id, filter, max }: GetNotesInfOptions) => {
  return {
    queryKey: ["notes", filter, max],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      await getNotesInfinite(id, pageParam, filter, max),
    initialPageParam: 0,
    getNextPageParam: (lastPage: VaultResponse) => {
      if (lastPage.nextPage) {
        return lastPage.nextPage
      }
    },
  }
}

const useGetNotesInfinite = ({ id, filter, max }: GetNotesInfOptions) =>
  useInfiniteQuery(getNotesInfQueryOptions({ id, filter, max }))

export { useGetNotesInfinite, getNotesInfQueryOptions }
