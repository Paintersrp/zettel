import { useQuery } from "@tanstack/react-query"

import { VaultAndNotes, VaultResponse } from "@/types/app"
import api from "@/lib/api"

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
  key: string,
  id: number,
  page: number,
  limit: number,
  filter: NotesSearchFilterOptions
) => useQuery(vaultQueryOptions(key, id, page, limit, filter))

const vaultQueryOptions = (
  key: string,
  id: number,
  page: number,
  limit: number,
  filter: NotesSearchFilterOptions
) => ({
  queryFn: async () => vaultQuery(id, page, limit, filter),
  queryKey: ["vault-notes", key, page, filter],
})

const vaultQuery = async (
  id: number,
  page: number,
  limit: number,
  filter: NotesSearchFilterOptions
): Promise<VaultAndNotes> => {
  try {
    const data: VaultAndNotes = await api
      .get(`v1/api/vaults/${id}?page=${page}&limit=${limit}&filter=${filter}`)
      .json()
    return data
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
