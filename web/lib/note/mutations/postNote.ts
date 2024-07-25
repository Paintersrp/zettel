"use server"

import "server-only"

import { NoteWithDetails } from "@/types/app"
import { NoteFormValues } from "@/lib/note/validate"
import { fetch } from "@/utils/fetch"

export type PostNoteResponse = {
  note: NoteWithDetails
}

const postNote = async (payload: NoteFormValues): Promise<PostNoteResponse> => {
  const response = await fetch("/v1/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error("Failed to create note")
  }

  return await response.json()
}

export { postNote }
