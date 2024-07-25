"use server"

import "server-only"

import type { UserSession } from "@/types/app"
import { ChangePasswordRequest } from "@/lib/validators/change-password"
import { fetch } from "@/utils/fetch"

// TODO:
export type ChangePasswordResponse = {}

const changePassword = async (
  data: ChangePasswordRequest,
  user: UserSession
): Promise<ChangePasswordResponse> => {
  const response = await fetch("/v1/auth/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      ...data,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

export { changePassword }
