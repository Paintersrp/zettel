import { FC, useMemo } from "react"
import { PlusCircle } from "lucide-react"

import { useCreateVault } from "@/lib/stores/createVault"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/components/providers/AuthProvider"

import VaultCard from "./VaultCard"
import VaultCardSkeleton from "./VaultCardSkeleton"

// TODO: Add Description to Vault
// TODO: Mobile Styles

interface VaultsProps {}

const Vaults: FC<VaultsProps> = () => {
  const { user } = useAuth()
  const { handleOpen } = useCreateVault()

  const inactiveVaults = useMemo(() => {
    if (user!.vaults && user!.active_vault) {
      return user!.vaults.filter((vault) => vault.id !== user!.active_vault!.id)
    }
    return []
  }, [user!.vaults, user!.active_vault])

  return (
    <div className="py-2 space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Active Vault</h1>
        <Button
          variant="outline"
          className="gap-1 items-center px-3"
          onClick={handleOpen}
        >
          <PlusCircle className="size-4 text-primary" />
          Create
        </Button>
      </div>
      <div className="space-x-0 space-y-6 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {user!.active_vault && (
            <VaultCard vault={user!.active_vault} isActive />
          )}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Your Vaults</h1>
        <p className="text-muted">Create and manage your vaults here.</p>
      </div>
      <div className="space-x-0 space-y-6 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {inactiveVaults.length > 0 &&
            inactiveVaults.map((vault) => <VaultCard vault={vault} />)}
          <VaultCardSkeleton />
        </div>
      </div>
    </div>
  )
}

export default Vaults
