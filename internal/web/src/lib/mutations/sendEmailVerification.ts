import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { User } from "@/types/app"
import api from "@/lib/api"

const useSendEmailVerificationMutation = (user: User) => {
  return useMutation({
    mutationFn: async () => await sendEmailVerificationMutation(user),
    onSuccess: sendEmailVerificationSuccess,
    onError: sendEmailVerificationError,
  })
}

const sendEmailVerificationMutation = async (user: User) => {
  const { status } = await api.post("v1/auth/send-verification", {
    json: {
      user_id: user!.id,
      email: user!.email,
    },
  })

  return { status }
}

const sendEmailVerificationSuccess = () => {
  // TODO: Invalidate User
  toast.success("Successfully sent verification email.")
}

const sendEmailVerificationError = (error: unknown) => {
  console.error("Failed to send email verification email:", error)
  toast.error("Failed to send email verification email.", {
    description: "Please try again in a few minutes.",
  })
}

export default useSendEmailVerificationMutation
