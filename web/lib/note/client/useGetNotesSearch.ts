import { useQuery } from "@tanstack/react-query"

import { getNotesSearch } from "@/lib/note/queries/getNotesSearch"

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

export { getNotesSearchOptions, useGetNotesSearch }
