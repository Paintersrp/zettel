import { useMemo } from "react"

import { NoteWithDetails } from "@/types/app"

export interface TagInsight {
  name: string
  count: number
  lastUsed: Date
}

export const useTagInsights = (notes: NoteWithDetails[]) => {
  const tagInsights = useMemo(() => {
    const insights: Record<string, TagInsight> = {}

    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        if (!insights[tag.name]) {
          insights[tag.name] = {
            name: tag.name,
            count: 0,
            lastUsed: new Date(0),
          }
        }
        insights[tag.name].count++
        const noteDate = new Date(note.updated_at)
        if (noteDate > insights[tag.name].lastUsed) {
          insights[tag.name].lastUsed = noteDate
        }
      })
    })

    return Object.values(insights)
  }, [notes])

  const mostUsedTags = useMemo(
    () => [...tagInsights].sort((a, b) => b.count - a.count).slice(0, 10),
    [tagInsights]
  )

  const recentlyActiveTags = useMemo(
    () =>
      [...tagInsights]
        .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
        .slice(0, 10),
    [tagInsights]
  )

  return {
    tagInsights,
    mostUsedTags,
    recentlyActiveTags,
  }
}
