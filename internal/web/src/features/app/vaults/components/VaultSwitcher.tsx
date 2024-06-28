import {
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react"
import { CheckIcon, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Vault } from "@/types/app"

import { Button } from "@/components/ui/Button"
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
import { VaultIcon } from "@/components/icons"
import { useVaultChange } from "@/features/app/vaults/api/vaultChange"
import { useVaultCreateModal } from "@/features/app/vaults/stores/vaultCreateModal"
import { useAuth } from "@/features/auth/providers"

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>

interface VaultSwitcherProps extends PopoverTriggerProps {}

// TODO: Better No Vault Handling

export const VaultSwitcher: FC<VaultSwitcherProps> = () => {
  const { user } = useAuth()
  const createModal = useVaultCreateModal()
  const changeMutation = useVaultChange()

  const [open, setOpen] = useState<boolean>(false)
  const hasVaults = user?.vaults && user?.vaults.length > 0

  const formattedVaults = useMemo(() => {
    if (hasVaults) {
      return user.vaults.map((item) => ({
        ...item,
      }))
    }
    return []
  }, [hasVaults, user?.vaults])

  const currentVault = user?.active_vault
    ? user.active_vault
    : { id: 0, name: "No Vault Available" }

  const onVaultSelect = (vault: Vault) => {
    changeMutation.mutate({ vaultId: vault.id, userId: user!.id })
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
          className="justify-between items-center bg-popover hover:bg-accent w-full"
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
            <CommandGroup heading="Vaults">
              {formattedVaults?.map((vault) => {
                const isDisabled = currentVault?.name === vault.name

                return (
                  <CommandItem
                    className={cn(
                      isDisabled && "bg-accent data-[selected=true]:bg-accent"
                    )}
                    key={vault.id}
                    onSelect={() => onVaultSelect(vault)}
                    disabled={isDisabled}
                  >
                    <span className="mr-2 size-4 text-primary">
                      <VaultIcon />
                    </span>
                    {vault.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto size-4 text-green-500",
                        isDisabled ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}

              <CommandSeparator />
            </CommandGroup>

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
