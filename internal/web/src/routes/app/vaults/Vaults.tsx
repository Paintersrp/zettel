import { useEffect, useMemo } from "react"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"
import { VaultCard } from "@/features/app/vaults/components/VaultCard"
import { VaultCardSkeleton } from "@/features/app/vaults/components/VaultCardSkeleton"
import { useVaultCreateModal } from "@/features/app/vaults/stores/vaultCreateModal"
import { useAuth } from "@/features/auth/providers"

// TODO: Mobile Styles
// TODO: API needs to automatically make first vault, or on a new vault when no active vault, the active vault.

const Vaults = () => {
  const { user } = useAuth()
  const createModal = useVaultCreateModal()

  const activeId = user!.active_vault_id
  const vaults = user!.vaults

  const inactiveVaults = useMemo(() => {
    if (vaults && user!.active_vault) {
      return vaults.filter((vault) => vault.id !== activeId)
    }
    return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, vaults])

  useEffect(() => {
    if (!activeId) {
      createModal.setOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  return (
    <div className="py-2 sm:py-0 space-y-4 w-full">
      <Heading
        title="Active Vault"
        description="Your currently active vault in the application."
      />
      <Separator />
      <div className="space-x-0 space-y-6 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {user!.active_vault ? (
            <VaultCard vault={user!.active_vault} isActive />
          ) : (
            <VaultCardSkeleton />
          )}
        </div>
      </div>
      <Heading
        title="Inactive Vaults"
        description="Create and manage your vaults here."
      />
      <Separator />
      <div className="space-x-0 space-y-6 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {inactiveVaults.length > 0 &&
            inactiveVaults.map((vault) => (
              <VaultCard key={`vault-${vault.id}`} vault={vault} />
            ))}
          {user!.active_vault && <VaultCardSkeleton />}
        </div>
      </div>
    </div>
  )
}

export default Vaults
