import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import type { User } from "@/types/app"
import { fetch } from "@/lib/fetch"

interface SendEmailVerificationResponse {
  status: number
}

// TODO: Errors?
const sendEmailVerification = async (
  user: User
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

const onSendEmailVerificationSuccess = () => {
  // TODO: Invalidate User
  toast.success("Successfully sent verification email.")
}

const onSendEmailVerificationError = (error: unknown) => {
  console.error("Failed to send email verification email:", error)
  toast.error("Failed to send email verification email.", {
    description: "Please try again in a few minutes.",
  })
}

type UseSendEmailVerificationOptions = {
  user: User
}

const useSendEmailVerification = ({
  user,
}: UseSendEmailVerificationOptions) => {
  return useMutation({
    mutationFn: async () => await sendEmailVerification(user),
    onSuccess: onSendEmailVerificationSuccess,
    onError: onSendEmailVerificationError,
  })
}

export { useSendEmailVerification, sendEmailVerification }
