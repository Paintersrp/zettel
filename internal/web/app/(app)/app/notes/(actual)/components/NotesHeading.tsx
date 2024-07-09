"use client"

import { formatVaultName } from "@/lib/string"
import { Heading } from "@/components/Heading"
import { useAuth } from "@/components/auth/provider"

export const NotesHeading = () => {
  const { user } = useAuth()

  if (!user || !user.active_vault) {
    return (
      <Heading
        title={`Vault Notes`}
        description={`View and manage notes for active vault.`}
      />
    )
  }

  const { name: vaultName } = user.active_vault
  const formattedVaultName = formatVaultName(vaultName)

  return (
    <Heading
      title={`${formattedVaultName} Notes`}
      description={`View and manage notes for vault ${formattedVaultName}.`}
    />
  )
}

export default NotesHeading
