import type { FC, ReactNode } from "react"
import { useNavigate, useRouter } from "@tanstack/react-router"
import { CheckIcon, ChevronsUpDown, SquareUser } from "lucide-react"

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
import { useAuth } from "@/components/providers/auth"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface UserMenuComboProps extends PopoverTriggerProps {
  open: boolean
  setOpen: (open: boolean) => void
  items: { to: string; text: string; icon: ReactNode }[]
}

export const UserMenuCombo: FC<UserMenuComboProps> = ({
  open,
  setOpen,
  items,
}) => {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = router.state.location.pathname
  const navigate = useNavigate({ from: pathname })

  const onSelect = (to: string) => {
    if (to.startsWith("http")) {
      window.location.href = to
    } else {
      navigate({ to })
    }
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
          className="justify-between items-center bg-contrast hover:bg-contrast-hover w-full"
        >
          <SquareUser className="mr-2 size-4 text-primary" />
          {user!.email ?? "Vault Name"}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] md:w-[220px] p-0 ">
        <Command className="bg-contrast">
          <CommandList>
            <CommandInput placeholder="Search account actions..."></CommandInput>
            <CommandSeparator />
            <CommandEmpty>No action found.</CommandEmpty>
            <CommandGroup heading="Actions">
              {items.map((item, index) => {
                const isDisabled = item.to === pathname

                return (
                  <CommandItem
                    key={`account-menu-${index}`}
                    onSelect={() => onSelect(item.to)}
                    disabled={isDisabled}
                  >
                    {item.icon}
                    {item.text}
                    <CheckIcon
                      className={cn(
                        "ml-auto size-4 text-success",
                        isDisabled ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default UserMenuCombo
