import { useQuery } from "@tanstack/react-query"

import { VaultAndNotes, VaultResponse } from "@/types/app"
import api from "@/lib/api"
import { NOTES_PER_PAGE } from "@/lib/const"

type NotesSearchFilterOptions =
  | "all"
  | "untagged"
  | "unfulfilled"
  | "fulfilled"
  | "orphans"

type NotesSearch = {
  filter: NotesSearchFilterOptions
}

const useVaultQuery = (
  id: number,
  page: number,
  filter: NotesSearchFilterOptions
) => useQuery(vaultQueryOptions(id, page, filter))

const vaultQueryOptions = (
  id: number,
  page: number,
  filter: NotesSearchFilterOptions
) => ({
  queryFn: async () => vaultQuery(id, page, filter),
  queryKey: ["notes", id, filter],
  retry: false,
  refetchOnWindowFocus: false,
})

const vaultQuery = async (
  id: number,
  page: number,
  filter: NotesSearchFilterOptions
): Promise<VaultResponse> => {
  try {
    const data: VaultAndNotes = await api
      .get(
        `v1/api/vaults/${id}?page=${page}&limit=${NOTES_PER_PAGE}&filter=${filter}`
      )
      .json()
    return { data, nextPage: 2, prevPage: 1 }
  } catch (error) {
    console.error("Error fetching vault:", error)
    throw new Error("Failed to fetch vault")
  }
}

export {
  type NotesSearchFilterOptions,
  type NotesSearch,
  useVaultQuery,
  vaultQueryOptions,
  vaultQuery,
}
