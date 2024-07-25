import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import type { UserSession } from "@/types/app"

import { sendPasswordReset } from "../mutations/sendPasswordReset"

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

export { useSendPasswordReset }
