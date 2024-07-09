import { fetch } from "@/lib/fetch"

// Need to refresh the jwt on vault change

interface VaultChangeMutationProps {
  vaultId: number
  userId: number
}

const updateActiveVault = async (
  props: VaultChangeMutationProps
): Promise<boolean> => {
  const response = await fetch("/v1/auth/change-vault", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vault_id: props.vaultId,
      user_id: props.userId,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return true
}

export { updateActiveVault }
