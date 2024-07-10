import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import type { UserSession } from "@/types/app"
import { fetch } from "@/lib/fetch"
import { UpdateProfileRequest } from "@/lib/validators/update-profile"

export interface ProfileResponse {
  token: string
  user: UserSession
}

const updateProfile = async (
  payload: UpdateProfileRequest,
  user: UserSession
): Promise<ProfileResponse> => {
  const response = await fetch("/v1/auth/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      ...payload,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Network response was not ok")
  }

  return await response.json()
}

const onUpdateProfileSuccess = (token: string, client: QueryClient) => {
  toast.success("Profile update successful", {
    description: `You have successfully updated your profile.`,
  })

  Cookies.set("jwt", token, { expires: 60, path: "/" })
  client.invalidateQueries({ queryKey: ["user"] })
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
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) =>
      await updateProfile(data, user),
    onSuccess: (res: { token: string; user: UserSession }) =>
      onUpdateProfileSuccess(res.token, client),
    onError: onUpdateProfileError,
  })
}

export { useUpdateProfile, updateProfile }
