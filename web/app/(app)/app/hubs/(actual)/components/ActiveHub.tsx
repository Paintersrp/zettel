"use client"

import { Vault } from "@/types/app"
import { cn } from "@/utils/cn"
import { useSidePanel } from "@/app/(app)/components/sidepanel/useSidePanel"

import VaultCard from "./HubCard"
import VaultCardCreateSkeleton from "./HubCardCreateSkeleton"

interface ActiveVaultProps {
  vault: Vault | null
}

const ActiveVault = ({ vault }: ActiveVaultProps) => {
  const { currentState } = useSidePanel()

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 w-full",
        !currentState.isOpen && "md:grid-cols-2"
      )}
    >
      {vault ? (
        <VaultCard vault={vault} isActive />
      ) : (
        <VaultCardCreateSkeleton />
      )}
    </div>
  )
}

export default ActiveVault
