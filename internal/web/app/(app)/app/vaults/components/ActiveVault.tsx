"use client"

import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/provider"
import { useSidePanel } from "@/app/(app)/lib/sidePanel"

import VaultCard from "./VaultCard"
import VaultCardCreateSkeleton from "./VaultCardCreateSkeleton"

// 8.56kb 7/04/24

const ActiveVault = () => {
  const { user } = useAuth()
  const { currentState } = useSidePanel()

  if (!user) {
    return <VaultCardCreateSkeleton />
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 w-full",
        !currentState.isOpen && "md:grid-cols-2"
      )}
    >
      {user!.active_vault ? (
        <VaultCard vault={user!.active_vault} isActive />
      ) : (
        <VaultCardCreateSkeleton />
      )}
    </div>
  )
}

export default ActiveVault
