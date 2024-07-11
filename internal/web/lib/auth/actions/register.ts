"use server"

import { RegisterRequest, RegisterResponse } from "@/lib/auth/validate"

export const register = async (payload: RegisterRequest): Promise<string> => {
  const response = await fetch("/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Network response was not ok")
  }

  const data: RegisterResponse = await response.json()
  return data.token
}
