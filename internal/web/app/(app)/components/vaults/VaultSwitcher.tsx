"use client"

import {
  use,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react"
import { CheckIcon, ChevronsUpDown, PlusCircle } from "lucide-react"

import type { Vault } from "@/types/app"
import { useUpdateActiveVault } from "@/lib/vault/client/useUpdateActiveVault"
import { Button } from "@/components/ui/button/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { useAuth } from "@/components/auth/provider"
import { VaultIcon } from "@/components/icons"

import { useVaultCreateModal } from "./useVaultCreateModal"

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>

interface VaultSwitcherProps extends PopoverTriggerProps {
  vaults: Promise<Vault[]>
}

interface FormattedVaults {
  activeVault: Vault | null
  inactiveVaults: Vault[]
}

// TODO: Better No Vault Handling

export const VaultSwitcher: FC<VaultSwitcherProps> = ({ vaults }) => {
  const vaultsData = use(vaults)
  const { user } = useAuth()
  const createModal = useVaultCreateModal()
  const updateActiveVaultMutation = useUpdateActiveVault()

  const [open, setOpen] = useState<boolean>(false)
  const hasVaults = vaultsData && vaultsData.length > 0

  const formattedVaults = useMemo<FormattedVaults>(() => {
    if (hasVaults && user?.active_vault) {
      const activeVault =
        vaultsData.find((vault) => vault.id === user.active_vault) || null
      const inactiveVaults = vaultsData.filter(
        (vault) => vault.id !== user.active_vault
      )
      return { activeVault, inactiveVaults }
    }
    return { activeVault: null, inactiveVaults: vaultsData || [] }
  }, [hasVaults, vaultsData, user?.active_vault])

  const currentVault = formattedVaults.activeVault || {
    id: 0,
    name: "No Vault Available",
  }

  const onVaultSelect = (vault: Vault) => {
    updateActiveVaultMutation.mutate({ vaultId: vault.id, userId: user!.id })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className="justify-between items-center bg-popover hover:bg-primary/20 w-full"
        >
          <span className="mr-2 size-4 text-primary">
            <VaultIcon />
          </span>
          {currentVault?.name ?? "Vault Name"}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] md:w-[220px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search vault..."></CommandInput>
            <CommandEmpty>No vault found.</CommandEmpty>
            <CommandGroup heading="Active Vault">
              {formattedVaults.activeVault && (
                <CommandItem
                  key={formattedVaults.activeVault.id}
                  className="bg-accent data-[selected=true]:bg-accent"
                  disabled
                >
                  <span className="mr-2 size-4 text-primary">
                    <VaultIcon />
                  </span>
                  {formattedVaults.activeVault.name}
                  <CheckIcon className="ml-auto size-4 text-green-500 opacity-100" />
                </CommandItem>
              )}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Other Vaults">
              {formattedVaults.inactiveVaults.map((vault) => (
                <CommandItem
                  key={vault.id}
                  onSelect={() => onVaultSelect(vault)}
                >
                  <span className="mr-2 size-4 text-primary">
                    <VaultIcon />
                  </span>
                  {vault.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  createModal.setOpen(!createModal.open)
                }}
              >
                <PlusCircle className="mr-2 size-4" />
                Create Vault
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default VaultSwitcher
