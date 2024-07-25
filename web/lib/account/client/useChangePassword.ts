import { useMutation } from "@tanstack/react-query"
import type { UseFormReset } from "react-hook-form"
import { toast } from "sonner"

import type { UserSession } from "@/types/app"

import { changePassword } from "../mutations/changePassword"
import { ChangePasswordRequest } from "../validate/changePassword"

const onChangePasswordSuccess = (
  reset: UseFormReset<ChangePasswordRequest>
) => {
  toast.success("Password update successful", {
    description: `You have successfully updated your password.`,
  })
  reset({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  })
}

const onChangePasswordError = (error: unknown) => {
  console.error("Password change error:", error)

  toast.error("Password change failed", {
    description: "Current password did not match our records.",
  })
}

type UseChangePasswordOptions = {
  user: UserSession
  reset: UseFormReset<ChangePasswordRequest>
}

const useChangePassword = ({ user, reset }: UseChangePasswordOptions) => {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) =>
      await changePassword(data, user),
    onSuccess: () => onChangePasswordSuccess(reset),
    onError: onChangePasswordError,
  })
}

export { useChangePassword }
