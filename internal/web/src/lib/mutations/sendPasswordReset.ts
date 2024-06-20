import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { User } from "@/types/app"
import api from "@/lib/api"

// TODO: Endpoint doesn't exist yet...
const useSendPasswordResetMutation = (
  user: User,
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return useMutation({
    mutationFn: async () => await sendPasswordResetMutation(user),
    onSuccess: () => sendPasswordResetSuccess(setIsSent),
    onError: sendPasswordResetError,
  })
}

const sendPasswordResetMutation = async (user: User) => {
  const { status } = await api.post("v1/auth/send-password-reset", {
    json: {
      user_id: user.id,
      email: user.email,
    },
  })

  return { status }
}

const sendPasswordResetSuccess = (
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // TODO: Invalidate User
  setIsSent(true)
  toast.success("Successfully sent password reset email.")
}

const sendPasswordResetError = (error: unknown) => {
  console.error("Failed to send password reset email:", error)
  toast.error(
    "Failed to send password reset email. Please try again in a few minutes."
  )
}

export default useSendPasswordResetMutation
