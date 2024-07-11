"use server"

import "server-only"

import type { UserSession } from "@/types/app"
import { fetch } from "@/utils/fetch"

// TODO: Endpoint doesn't exist yet...
interface SendPasswordResetResponse {
  status: number
}

const sendPasswordReset = async (
  user: UserSession
): Promise<SendPasswordResetResponse> => {
  const response = await fetch("/v1/auth/send-password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      email: user.email,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return { status: response.status }
}
export { sendPasswordReset }
