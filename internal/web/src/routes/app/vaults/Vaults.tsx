import { FC, useMemo } from "react"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"
import { useAuth } from "@/components/providers/auth"

import VaultCard from "./VaultCard"
import VaultCardSkeleton from "./VaultCardSkeleton"

// TODO: Add Description to Vault
// TODO: Mobile Styles

interface VaultsProps {}

const Vaults: FC<VaultsProps> = () => {
  const { user } = useAuth()

  const inactiveVaults = useMemo(() => {
    if (user!.vaults && user!.active_vault) {
      return user!.vaults.filter((vault) => vault.id !== user!.active_vault!.id)
    }
    return []
  }, [user!.active_vault_id, user!.vaults])

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
