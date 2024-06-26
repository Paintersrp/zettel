import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { api } from "@/lib/api"
import type { User } from "@/types/app"

// TODO: Endpoint doesn't exist yet...

const sendPasswordReset = async (user: User) => {
  const { status } = await api.post("v1/auth/send-password-reset", {
    json: {
      user_id: user.id,
      email: user.email,
    },
  })

  return { status }
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
  user: User
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
