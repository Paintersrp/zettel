import { cookies } from "next/headers"

import type { NoteWithDetails } from "@/types/app"

const getNote = async (id: string): Promise<NoteWithDetails> => {
  const requestCookies = cookies()
  const jwtToken = requestCookies.get("jwt")

  try {
    const response = await fetch(`http://localhost:6474/v1/api/notes/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken?.value}`,
        "Content-Type": "application/json",
      },
    })

    const data: NoteWithDetails = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching note:", error)
    throw new Error("Failed to fetch note")
  }
}

export { getNote }
