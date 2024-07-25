"use server"

import "server-only"

import type { UserSession } from "@/types/app"
import { fetch } from "@/utils/fetch"

interface SendEmailVerificationResponse {
  status: number
}

// TODO: Errors?
const sendEmailVerification = async (
  user: UserSession
): Promise<SendEmailVerificationResponse> => {
  const response = await fetch("/v1/auth/send-verification", {
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

export { sendEmailVerification }
