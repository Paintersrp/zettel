"use server"

import "server-only"

import type { NoteWithDetails } from "@/types/app"
import { fetch } from "@/utils/fetch"

type SearchQueryResults = NoteWithDetails[] | undefined

const getNotesSearch = async (input: string): Promise<SearchQueryResults> => {
  try {
    const response = await fetch(`/v1/api/notes/search?q=${input}`, {
      method: "GET",
    })

    const data: SearchQueryResults = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching notes search:", error)
    throw new Error("Failed to fetch search results for notes")
  }
}

export { getNotesSearch }
