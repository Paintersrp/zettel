import { useMemo } from "react"

import { NoteWithDetails } from "@/types/app"

export const useVaultStatistics = (notes: NoteWithDetails[]) => {
  return useMemo(() => {
    if (notes.length === 0) return null

    const totalWords = notes.reduce(
      (sum, note) => sum + note.content.split(/\s+/).length,
      0
    )
    const averageWords = Math.round(totalWords / notes.length)

    const now = new Date()
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    const notesLastTwoWeeks = notes.filter(
      (note) => new Date(note.created_at) >= twoWeeksAgo
    )

    const dailyCreation = Array.from({ length: 14 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const count = notesLastTwoWeeks.filter(
        (note) =>
          new Date(note.created_at).toDateString() === date.toDateString()
      ).length
      return {
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      }
    }).reverse()

    const longestNote = notes.reduce((longest, note) =>
      note.content.length > longest.content.length ? note : longest
    )
    const shortestNote = notes.reduce((shortest, note) =>
      note.content.length < shortest.content.length ? note : shortest
    )

    const orphanedNotesCount = notes.filter(
      (note) => note.linked_notes?.length === 0
    ).length
    const orphanedPercent = Math.round(
      (orphanedNotesCount / notes.length) * 100
    )

    const untaggedNotesCount = notes.filter(
      (note) => note.tags?.length === 0
    ).length
    const untaggedNotesPercent = Math.round(
      (untaggedNotesCount / notes.length) * 100
    )
    const uniqueTagsCount = new Set(notes.flatMap((note) => note.tags)).size

    return {
      totalNotes: notes.length,
      averageWords,
      notesLastTwoWeeks: notesLastTwoWeeks.length,
      dailyCreation,
      longestNote: {
        title: longestNote.title,
        wordCount: longestNote.content.split(/\s+/).length,
      },
      shortestNote: {
        title: shortestNote.title,
        wordCount: shortestNote.content.split(/\s+/).length,
      },
      orphanedNotes: {
        count: orphanedNotesCount,
        percent: orphanedPercent,
      },
      tags: {
        count: uniqueTagsCount,
        unTaggedPercent: untaggedNotesPercent,
      },
      totalWords,
    }
  }, [notes])
}
