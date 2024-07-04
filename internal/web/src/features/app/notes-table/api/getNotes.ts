import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"
import type { VaultAndNotes } from "@/types/app"

const getNotes = async (
  id: number,
  page: number,
  limit: number,
  filter: string
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

type GetNotesOptions = {
  key: string
  id: number
  page: number
  max: number
  filter: string
}

const getNotesOptions = ({ key, id, page, max, filter }: GetNotesOptions) => ({
  queryFn: async () => await getNotes(id, page, max, filter),
  queryKey: ["vault-notes", key, page, filter],
})

const useGetNotes = ({ key, id, page, max, filter }: GetNotesOptions) =>
  useQuery(getNotesOptions({ key, id, page, max, filter }))

export { getNotes, getNotesOptions, useGetNotes }
