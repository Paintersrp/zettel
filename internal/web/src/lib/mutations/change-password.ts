import { useMutation } from "@tanstack/react-query"
import { UseFormReset } from "react-hook-form"
import { toast } from "sonner"

import { User } from "@/types/app"
import axios from "@/lib/axios"
import { ChangePasswordRequest } from "@/lib/validators/auth"

interface ChangePasswordResponse {}

const changePasswordMutation = (
  reset: UseFormReset<ChangePasswordRequest>,
  user: User
) => {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) =>
      changePasswordPost(data, user),
    onSuccess: () => changePasswordSuccess(reset),
    onError: changePasswordError,
  })
}

const changePasswordPost = async (
  data: ChangePasswordRequest,
  user: User
): Promise<ChangePasswordResponse> => {
  try {
    const { data: res, status } = await axios.post<ChangePasswordResponse>(
      "v1/auth/change-password",
      {
        email: user.email,
        ...data,
      }
    )

    if (status !== 200) {
      throw new Error("Network response was not ok")
    }

    return res
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

export { changePasswordMutation, changePasswordPost }
