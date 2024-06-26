import { useInfiniteQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { api } from "@/lib/api"
import { NOTES_PER_PAGE } from "@/lib/const"
import type { VaultAndNotes, VaultResponse } from "@/types/app"

import type { NotesFilter } from "@/features/app/notes/validators"

const getNotesInfQuery = async (
  id: number,
  page: number,
  filter: NotesFilter["filter"],
  max?: number
): Promise<VaultResponse> => {
  try {
    const data: VaultAndNotes = await api
      .get(
        `v1/api/vaults/${id}?page=${page}&limit=${max ? max : NOTES_PER_PAGE}&filter=${filter}`
      )
      .json()

    const nextPage = data.has_more ? page + 1 : null
    const prevPage = page !== 0 ? page - 1 : null

    return { data, nextPage, prevPage }
  } catch (error) {
    toast.error("Error fetching vault note data", {
      description: `Network response was not ok. Please try again in a few minutes.`,
    })
    throw new Error("Failed to fetch vault notes")
  }
}

type GetNotesInfOptions = {
  id: number
  filter: NotesFilter["filter"]
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

export { getNotesInfQuery, useGetNotesInfQuery, getNotesInfQueryOptions }
