import { useInfiniteQuery } from "@tanstack/react-query"

import type { VaultResponse } from "@/types/app"

import { getNotesInfQuery } from "./getNotesInf"

type GetNotesInfOptions = {
  id: number
  filter: string
  max?: number
}

const getNotesInfQueryOptions = ({ id, filter, max }: GetNotesInfOptions) => {
  return {
    queryKey: ["notes", filter, max, id],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      await getNotesInfQuery(id, pageParam, filter, max),
    initialPageParam: 0,
    getNextPageParam: (lastPage: VaultResponse) => {
      if (lastPage.nextPage) {
        return lastPage.nextPage
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  }
}

const useGetNotesInfQuery = ({ id, filter, max }: GetNotesInfOptions) =>
  useInfiniteQuery(getNotesInfQueryOptions({ id, filter, max }))

export { useGetNotesInfQuery, getNotesInfQueryOptions }
