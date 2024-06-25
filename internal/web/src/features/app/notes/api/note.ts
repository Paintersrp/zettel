import { useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"

import type { NoteWithDetails } from "@/types/app"
import { api } from "@/lib/api"

const noteQuery = async (id: number): Promise<NoteWithDetails> => {
  try {
    const data: NoteWithDetails = await api.get(`v1/api/notes/${id}`).json()
    return data
  } catch (error) {
    console.error("Error fetching note:", error)
    throw new Error("Failed to fetch note")
  }
}

const useNoteQuery = (id: number, note?: NoteWithDetails) => {
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const queryResult = useQuery({
    queryFn: async () => {
      if (isMounted.current) {
        return noteQuery(id)
      }
      return null
    },
    queryKey: ["note", id],
    refetchOnWindowFocus: false,
    enabled: !note,
  })

  return queryResult
}

export { useNoteQuery, noteQuery }
