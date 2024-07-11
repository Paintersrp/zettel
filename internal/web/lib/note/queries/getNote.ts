"use server"

import "server-only"

import { cache } from "react"

import type { NoteWithDetails } from "@/types/app"
import { fetch } from "@/utils/fetch"

const preloadGetNote = async (id: string) => {
  void getNote(id)
}

const getNote = cache(async (id: string): Promise<NoteWithDetails> => {
  try {
    const response = await fetch(`/v1/api/notes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data: NoteWithDetails = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching note:", error)
    throw new Error("Failed to fetch note")
  }
})

export { getNote, preloadGetNote }
