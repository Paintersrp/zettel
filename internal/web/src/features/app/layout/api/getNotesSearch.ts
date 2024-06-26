import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"
import type { NoteWithDetails } from "@/types/app"

type SearchQueryResults = NoteWithDetails[] | undefined

const getNotesSearch = async (input: string): Promise<SearchQueryResults> => {
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

type GetNotesSearchOptions = {
  input: string
}

const getNotesSearchOptions = ({ input }: GetNotesSearchOptions) => ({
  queryFn: async () => await getNotesSearch(input),
  queryKey: ["notes-search", input],
  enabled: false,
})

const useGetNotesSearch = ({ input }: GetNotesSearchOptions) =>
  useQuery(getNotesSearchOptions({ input }))

export {
  type SearchQueryResults,
  getNotesSearch,
  getNotesSearchOptions,
  useGetNotesSearch,
}
