"use client"

import { useMemo } from "react"

import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/provider"
import { useSidePanel } from "@/app/(app)/state/sidePanel"

import VaultCard from "./VaultCard"
import VaultCardCreateSkeleton from "./VaultCardCreateSkeleton"

const InactiveVaults = () => {
  const { user } = useAuth()
  const { currentState } = useSidePanel()

  if (!user) {
    return null
  }

  const activeId = user!.active_vault_id
  const vaults = user!.vaults

  const inactiveVaults = useMemo(() => {
    if (vaults && user!.active_vault) {
      return vaults.filter((vault) => vault.id !== activeId)
    }
    return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, vaults])

  return (
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
      {user!.active_vault && <VaultCardCreateSkeleton />}
    </div>
  )
}

export default InactiveVaults
