"use client"

import { Vault } from "@/types/app"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/provider"
import { useSidePanel } from "@/app/(app)/state/sidePanel"

import VaultCard from "./VaultCard"
import VaultCardCreateSkeleton from "./VaultCardCreateSkeleton"

interface InactiveVaultsProps {
  vaults?: Vault[]
}

const InactiveVaults = ({ vaults }: InactiveVaultsProps) => {
  const { user } = useAuth()
  const { currentState } = useSidePanel()

  if (!vaults || vaults.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 w-full",
        !currentState.isOpen &&
          "md:grid-cols-2 xl:grid-cols-3 lg:gap-4 xl:gap-6",
        currentState.isOpen && "md:grid-cols-1 xl:grid-cols-2 xl:gap-4"
      )}
    >
      {vaults.length > 0 &&
        vaults.map((vault) => (
          <VaultCard key={`vault-${vault.id}`} vault={vault} />
        ))}
      {user!.active_vault && <VaultCardCreateSkeleton />}
    </div>
  )
}

export default InactiveVaults
