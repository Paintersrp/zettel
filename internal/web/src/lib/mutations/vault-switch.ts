import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useNavigate, UseNavigateResult } from "@tanstack/react-router"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { User } from "@/types/app"
import axios from "@/lib/axios"

export interface VaultSwitchRequest {
  id: number
}

const vaultSwitchPost = async (data: VaultSwitchRequest, user: User) => {
  const { status } = await axios.post("v1/auth/change-vault", {
    vault_id: data.id,
    user_id: user.id,
  })

  if (status !== 200) {
    throw new Error("Network response was not ok")
  }

  return true
}

const vaultSwitchSuccess = (
  client: QueryClient,
  navigate: UseNavigateResult<string>
) => {
  client.invalidateQueries({ queryKey: ["user"] })

  setTimeout(() => {
    navigate({ to: "/vault" })
    toast.success("Active vault change successful", {
      description: `You have successfully changed vaults. Redirecting...`,
    })
  }, 300)
}

const vaultSwitchError = (_: AxiosError) => {
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const vaultSwitchMutation = (user: User) => {
  const client = useQueryClient()
  const navigate = useNavigate()

  return {
    mutationFn: async (data: VaultSwitchRequest) => vaultSwitchPost(data, user),
    onSuccess: () => vaultSwitchSuccess(client, navigate),
    onError: vaultSwitchError,
  }
}

export { vaultSwitchMutation, vaultSwitchPost }
