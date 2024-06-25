import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"
import type { VaultAndNotes } from "@/types/app"

import type { NotesFilter } from "@/features/app/notes/validators"

const getNotesQuery = async (
  id: number,
  page: number,
  limit: number,
  filter: NotesFilter["filter"]
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

const getNotesQueryOptions = (
  key: string,
  id: number,
  page: number,
  limit: number,
  filter: NotesFilter["filter"]
) => ({
  queryFn: async () => await getNotesQuery(id, page, limit, filter),
  queryKey: ["vault-notes", key, page, filter],
})

const useGetNotesQuery = (
  key: string,
  id: number,
  page: number,
  limit: number,
  filter: NotesFilter["filter"]
) => useQuery(getNotesQueryOptions(key, id, page, limit, filter))

export { getNotesQuery, getNotesQueryOptions, useGetNotesQuery }
