import { useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"
import type { NoteWithDetails } from "@/types/app"

const getNoteQuery = async (id: string): Promise<NoteWithDetails> => {
  try {
    const data: NoteWithDetails = await api.get(`v1/api/notes/${id}`).json()
    return data
  } catch (error) {
    console.error("Error fetching note:", error)
    throw new Error("Failed to fetch note")
  }
}

type UseGetNoteQueryOptions = {
  id: string
  note?: NoteWithDetails
}

const useGetNoteQuery = ({ id, note }: UseGetNoteQueryOptions) => {
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const queryResult = useQuery({
    queryFn: async () => {
      if (isMounted.current) {
        return getNoteQuery(id)
      }
      return null
    },
    queryKey: ["note", id],
    refetchOnWindowFocus: false,
    enabled: !note,
  })

  return queryResult
}

export { useGetNoteQuery, getNoteQuery }
