import { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

import { User } from "@/types/app"
import axios from "@/lib/axios"

import { ChangePasswordRequest } from "../validators/auth"

const passwordPost = async (data: ChangePasswordRequest, user: User) => {
  const { data: res, status } = await axios.post("v1/auth/change-password", {
    email: user.email,
    ...data,
  })

  if (status !== 200) {
    throw new Error("Network response was not ok")
  }

  return res
}

const passwordSuccess = (
  form: UseFormReturn<ChangePasswordRequest, any, undefined>
) => {
  toast.success("Password update successful", {
    description: `You have successfully updated your password.`,
  })
  form.reset({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  })
}

const passwordError = () => {
  toast.error("Password change failed", {
    description: "Current password did not match our records.",
  })
}

const passwordMutation = (
  form: UseFormReturn<ChangePasswordRequest, any, undefined>,
  user: User
) => {
  return {
    mutationFn: async (data: ChangePasswordRequest) => passwordPost(data, user),
    onSuccess: () => passwordSuccess(form),
    onError: passwordError,
  }
}

export { passwordMutation, passwordPost }
