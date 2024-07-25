import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import type { UserSession } from "@/types/app"

import { sendEmailVerification } from "../mutations/sendEmailVerification"

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
  user: UserSession
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

export { useSendEmailVerification }
