import { useQuery } from "@tanstack/react-query"

import type { VaultAndNotes } from "@/types/app"
import { fetch } from "@/lib/fetch"

const getNotes = async (
  id: number,
  page: number,
  max: number,
  filter: string
): Promise<VaultAndNotes> => {
  try {
    const response = await fetch(
      `/v1/api/vaults/${id}?page=${page}&limit=${max}&filter=${filter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const data: VaultAndNotes = await response.json()
    console.log("data", data)
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
