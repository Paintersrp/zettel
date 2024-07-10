"use client"

import { Vault } from "@/types/app"
import { cn } from "@/lib/utils"
import { useSidePanel } from "@/app/(app)/state/sidePanel"

import VaultCard from "./VaultCard"
import VaultCardCreateSkeleton from "./VaultCardCreateSkeleton"

// 8.56kb 7/04/24

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
