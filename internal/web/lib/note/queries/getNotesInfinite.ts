"use server"

import "server-only"

import type { VaultAndNotes, VaultResponse } from "@/types/app"
import { NOTES_PER_PAGE } from "@/lib/const"
import { fetch } from "@/utils/fetch"

const getNotesInfinite = async (
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
    console.error("Error fetching note:", error)
    throw new Error("Failed to fetch vault notes")
  }
}

export { getNotesInfinite }
