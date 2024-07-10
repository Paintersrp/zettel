import { Suspense } from "react"

import { getSession } from "@/lib/session"
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"

import { getVaults } from "../../lib/getVaults"
import ActiveVault from "./components/ActiveVault"
import InactiveVaults from "./components/InactiveVaults"
import VaultCardSkeleton from "./components/VaultCardSkeleton"

// TODO: Mobile Styles
// TODO: API needs to automatically make first vault, or on a new vault when no active vault, the active vault.
// TODO: Note Count in getVaults

const Vaults = async () => {
  const vaultsPromise = getVaults()
  const userPromise = getSession()
  const [vaults, user] = await Promise.all([vaultsPromise, userPromise])

  const activeVault =
    vaults.find((vault) => vault.id === user?.active_vault) || null
  const inactiveVaults = vaults.filter(
    (vault) => vault.id !== user?.active_vault
  )

  return (
    <div className="px-4 py-2 space-y-4 w-full bg-accent min-h-full">
      <Heading
        title="Active Vault"
        description="Your currently active vault in the application."
      />
      <Separator />
      <div className="space-x-0 space-y-6 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
        <Suspense
          fallback={
            <VaultCardSkeleton className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" />
          }
        >
          <ActiveVault vault={activeVault} />
        </Suspense>
      </div>
      <Heading
        title="Inactive Vaults"
        description="Create and manage your vaults here."
      />
      <Separator />
      <div className="space-x-0 space-y-6 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
        <Suspense
          fallback={
            <div className="w-full flex gap-6">
              <VaultCardSkeleton className="w-full" />
              <VaultCardSkeleton className="w-full" />
            </div>
          }
        >
          <InactiveVaults vaults={inactiveVaults} />
        </Suspense>
      </div>
    </div>
  )
}

export default Vaults
