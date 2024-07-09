import { cookies } from "next/headers"

import { User } from "@/types/app"

export const getUser = async (): Promise<User | null> => {
  const requestCookies = cookies()
  const jwtToken = requestCookies.get("jwt")

  if (!jwtToken) {
    return null
  }

  try {
    const response = await fetch("http://localhost:6474/v1/auth/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken.value}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data: User = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}
