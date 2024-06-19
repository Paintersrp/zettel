import { useState, type FC } from "react"
import { ChevronsUpDown, PlusCircle } from "lucide-react"

import { Vault } from "@/types/app"
import { useVaultSwitchMutation } from "@/lib/mutations/vault-switch"
import { useCreateVault } from "@/lib/stores/createVault"
import { cn } from "@/lib/utils"
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

import { CheckIcon, VaultIcon } from "./icons"
import { useAuth } from "./providers/AuthProvider"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface VaultSwitcherProps extends PopoverTriggerProps {}

// TODO: Better No Vault Handling

const VaultSwitcher: FC<VaultSwitcherProps> = () => {
  const { user } = useAuth()
  const { open: createModalOpen, setOpen: setCreateModalOpen } =
    useCreateVault()
  const { mutate: switchVault } = useVaultSwitchMutation(user!)

  const [open, setOpen] = useState<boolean>(false)
  const hasVaults = user?.vaults && user?.vaults.length > 0

  const formattedVaults: Vault[] | undefined = hasVaults
    ? user.vaults.map((item) => ({
        ...item,
      }))
    : []

  const currentVault = user?.active_vault
    ? user.active_vault
    : { id: 0, name: "No Vault Available" }

  const onVaultSelect = (vault: Vault) => {
    switchVault({ id: vault.id })
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
          className={cn(
            "justify-between items-center bg-contrast hover:bg-contrast-hover w-full"
          )}
        >
          <span className="mr-2 size-4 text-primary">
            <VaultIcon />
          </span>
          {currentVault?.name ?? "Vault Name"}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] md:w-[260px] p-0 ">
        <Command className="bg-contrast">
          <CommandList>
            <CommandInput placeholder="Search vault..."></CommandInput>
            <CommandEmpty>No vault found.</CommandEmpty>
            <CommandGroup heading="Vaults">
              {formattedVaults?.map((vault) => (
                <CommandItem
                  className={cn(
                    currentVault?.name === vault.name &&
                      "bg-primary-hover data-[selected=true]:bg-primary-hover"
                  )}
                  key={vault.id}
                  onSelect={() => onVaultSelect(vault)}
                  disabled={currentVault?.name === vault.name}
                >
                  <span className="mr-2 size-4">
                    <VaultIcon />
                  </span>
                  {vault.name}
                  <span
                    className={cn(
                      "ml-auto size-4 text-success",
                      currentVault?.name === vault.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  >
                    <CheckIcon />
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  setCreateModalOpen(!createModalOpen)
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

export { VaultSwitcher }
