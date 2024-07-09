import { useQuery } from "@tanstack/react-query"

import { getNote } from "./getNote"

type UseGetNoteQueryOptions = {
  id: string
}

const useGetNoteQuery = ({ id }: UseGetNoteQueryOptions) => {
  return useQuery({
    queryFn: async () => getNote(id),
    queryKey: ["note", id],
    refetchOnWindowFocus: false,
  })
}

export { useGetNoteQuery }
