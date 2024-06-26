import { useMutation } from "@tanstack/react-query"
import type { UseFormReset } from "react-hook-form"
import { toast } from "sonner"

import { api } from "@/lib/api"
import type { User } from "@/types/app"

import type { ChangePasswordRequest } from "@/features/app/account/password/validators"

// TODO:
interface ChangePasswordResponse {}

const changePassword = async (
  data: ChangePasswordRequest,
  user: User
): Promise<ChangePasswordResponse> => {
  const res = await api.post("v1/auth/change-password", {
    json: {
      email: user.email,
      ...data,
    },
  })

  if (res.status !== 200) {
    throw new Error("Network response was not ok")
  }

  return await res.json()
}

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
  user: User
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

export { useChangePassword, changePassword }
