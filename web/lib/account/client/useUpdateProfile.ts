import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import type { UserSession } from "@/types/app"

import { updateProfile } from "../mutations/updateProfile"
import { UpdateProfileRequest } from "../validate/updateProfile"

const onUpdateProfileSuccess = (token: string, router: AppRouterInstance) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })
  toast.success("Profile update successful", {
    description: `You have successfully updated your profile.`,
  })
  router.refresh()
}

const onUpdateProfileError = (error: unknown) => {
  console.error("Profile update failed:", error)
  toast.error("Profile update failed", {
    description:
      error instanceof Error ? error.message : "An unknown error occurred",
  })
}

type UseUpdateProfileOptions = {
  user: UserSession
}

// TODO: ROUTER.REFRESH
const useUpdateProfile = ({ user }: UseUpdateProfileOptions) => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) =>
      await updateProfile(data, user),
    onSuccess: (res: { token: string; user: UserSession }) =>
      onUpdateProfileSuccess(res.token, router),
    onError: onUpdateProfileError,
  })
}

export { useUpdateProfile, updateProfile }
