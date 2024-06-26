import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { api } from "@/lib/api"
import type { User } from "@/types/app"

// TODO: Errors?
const sendEmailVerification = async (user: User) => {
  const { status } = await api.post("v1/auth/send-verification", {
    json: {
      user_id: user!.id,
      email: user!.email,
    },
  })

  return { status }
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
