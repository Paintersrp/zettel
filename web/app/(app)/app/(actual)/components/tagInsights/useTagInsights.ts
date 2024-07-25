import { NoteWithDetails } from "@/types/app"

export interface TagInsight {
  name: string
  count: number
  lastUsed: Date
}

export function getTagInsights(notes: NoteWithDetails[]) {
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

  const tagInsights = Object.values(insights)
  const mostUsedTags = [...tagInsights]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
  const recentlyActiveTags = [...tagInsights]
    .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
    .slice(0, 10)

  return {
    tagInsights,
    mostUsedTags,
    recentlyActiveTags,
  }
}
