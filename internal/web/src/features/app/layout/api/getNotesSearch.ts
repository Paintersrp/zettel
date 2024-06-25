import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"
import type { NoteWithDetails } from "@/types/app"

type SearchQueryResults = NoteWithDetails[] | undefined

const getNotesSearchQuery = async (
  input: string
): Promise<SearchQueryResults> => {
  try {
    const data: SearchQueryResults = await api
      .get(`v1/api/notes/search?q=${input}`)
      .json()
    return data
  } catch (error) {
    console.error("Error fetching notes search:", error)
    throw new Error("Failed to fetch search results for notes")
  }
}

const getNotesSearchQueryOptions = (input: string) => ({
  queryFn: async () => await getNotesSearchQuery(input),
  queryKey: ["notes-search", input],
  enabled: false,
})

const useGetNotesSearchQuery = (input: string) =>
  useQuery(getNotesSearchQueryOptions(input))

export {
  type SearchQueryResults,
  getNotesSearchQuery,
  getNotesSearchQueryOptions,
  useGetNotesSearchQuery,
}
