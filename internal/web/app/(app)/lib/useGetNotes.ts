import { useQuery } from "@tanstack/react-query"

import { getNotes } from "./getNotes"

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

export { getNotesOptions, useGetNotes }
