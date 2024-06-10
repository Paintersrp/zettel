import { useMutation } from "@tanstack/react-query"
import { UseFormReset } from "react-hook-form"
import { toast } from "sonner"

import { User } from "@/types/app"
import api from "@/lib/api"
import { ChangePasswordRequest } from "@/lib/validators/auth"

interface ChangePasswordResponse {}

const useChangePasswordMutation = (
  reset: UseFormReset<ChangePasswordRequest>,
  user: User
) => {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) =>
      changePasswordMutation(data, user),
    onSuccess: () => changePasswordSuccess(reset),
    onError: changePasswordError,
  })
}

const changePasswordMutation = async (
  data: ChangePasswordRequest,
  user: User
): Promise<ChangePasswordResponse> => {
  try {
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
  } catch (error) {
    console.error("Error changing password:", error)
    throw new Error("Failed to change password")
  }
}

const changePasswordSuccess = (reset: UseFormReset<ChangePasswordRequest>) => {
  toast.success("Password update successful", {
    description: `You have successfully updated your password.`,
  })
  reset({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  })
}

const changePasswordError = (error: unknown) => {
  console.error("Password change error:", error)

  toast.error("Password change failed", {
    description: "Current password did not match our records.",
  })
}

export { useChangePasswordMutation, changePasswordMutation }
