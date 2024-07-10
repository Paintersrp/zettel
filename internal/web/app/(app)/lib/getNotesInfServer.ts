import { toast } from "sonner"

import type { VaultAndNotes, VaultResponse } from "@/types/app"
import { NOTES_PER_PAGE } from "@/lib/const"
import { fetch } from "@/lib/server-fetch"

const getNotesInfQuery = async (
  id: number,
  page: number,
  filter: string,
  max?: number
): Promise<VaultResponse> => {
  try {
    const response = await fetch(
      `/v1/api/vaults/${id}?page=${page}&limit=${
        max ? max : NOTES_PER_PAGE
      }&filter=${filter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: VaultAndNotes = await response.json()
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

export { getNotesInfQuery }
