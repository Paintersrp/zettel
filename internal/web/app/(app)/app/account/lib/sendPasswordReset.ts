import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import type { UserSession } from "@/types/app"
import { fetch } from "@/lib/fetch"

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

const onSendPasswordResetSuccess = (
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // TODO: Invalidate User
  setIsSent(true)
  toast.success("Successfully sent password reset email.")
}

const onSendPasswordResetError = (error: unknown) => {
  console.error("Failed to send password reset email:", error)
  toast.error(
    "Failed to send password reset email. Please try again in a few minutes."
  )
}

type UseSendPasswordResetOptions = {
  user: UserSession
  // TODO: Upgrade to a timed action?
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>
}

const useSendPasswordReset = ({
  user,
  setIsSent,
}: UseSendPasswordResetOptions) => {
  return useMutation({
    mutationFn: async () => await sendPasswordReset(user),
    onSuccess: () => onSendPasswordResetSuccess(setIsSent),
    onError: onSendPasswordResetError,
  })
}

export { useSendPasswordReset, sendPasswordReset }
