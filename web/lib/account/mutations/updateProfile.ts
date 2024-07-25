"use server"

import "server-only"

import type { UserSession } from "@/types/app"
import { UpdateProfileRequest } from "@/lib/validators/update-profile"
import { fetch } from "@/utils/fetch"

export interface ProfileResponse {
  token: string
  user: UserSession
}

const updateProfile = async (
  payload: UpdateProfileRequest,
  user: UserSession
): Promise<ProfileResponse> => {
  const response = await fetch("/v1/auth/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      ...payload,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Network response was not ok")
  }

  return await response.json()
}

export { updateProfile }
