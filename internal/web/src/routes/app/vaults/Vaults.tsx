import { useEffect, useMemo } from "react"

import { cn } from "@/lib/utils"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"
import { VaultCard } from "@/features/app/vaults/components/VaultCard"
import { VaultCardSkeleton } from "@/features/app/vaults/components/VaultCardSkeleton"
import { useVaultCreateModal } from "@/features/app/vaults/stores/vaultCreateModal"
import { useAuth } from "@/features/auth/providers"

// 8.56kb 7/04/24

// TODO: Mobile Styles
// TODO: API needs to automatically make first vault, or on a new vault when no active vault, the active vault.

const Vaults = () => {
  const { user } = useAuth()
  const { currentState } = useSidePanel()
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
    <div className="px-4 py-2 space-y-4 w-full bg-accent">
      <Heading
        title="Active Vault"
        description="Your currently active vault in the application."
      />
      <Separator />
      <div className="space-x-0 space-y-6 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
        <div
          className={cn(
            "grid grid-cols-1 gap-6 w-full",
            !currentState.isOpen && "md:grid-cols-2"
          )}
        >
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
        <div
          className={cn(
            "grid grid-cols-1 gap-2 w-full",
            !currentState.isOpen &&
              "md:grid-cols-2 xl:grid-cols-3 lg:gap-4 xl:gap-6",
            currentState.isOpen && "md:grid-cols-1 xl:grid-cols-2 xl:gap-4"
          )}
        >
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
