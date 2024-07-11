"use server"

import "server-only"

import { VaultAndNotes } from "@/types/app"
import { fetch } from "@/utils/fetch"

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
    return data
  } catch (error) {
    console.error("Error fetching vault:", error)
    throw new Error("Failed to fetch vault")
  }
}

export { getNotes }
