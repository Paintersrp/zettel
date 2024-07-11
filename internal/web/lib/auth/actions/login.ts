"use server"

import { LoginRequest, LoginResponse } from "@/lib/auth/validate"

export const login = async (payload: LoginRequest): Promise<string> => {
  const response = await fetch("http://localhost:6474/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized")
    }
    throw new Error("Network response was not ok")
  }

  const data: LoginResponse = await response.json()
  return data.token
}
