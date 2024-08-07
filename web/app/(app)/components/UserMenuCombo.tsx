import type { FC, ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { CheckIcon, ChevronsUpDown, SquareUser } from "lucide-react"

import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { useAuth } from "@/components/auth/provider"

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
  const pathname = usePathname()

  const onSelect = (to: string) => {
    if (to.startsWith("http")) {
      window.location.href = to
    } else {
      router.push(to)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          className="justify-between items-center bg-popover hover:bg-primary/20 w-full"
        >
          <SquareUser className="mr-2 size-4 text-primary" />
          {user?.email ?? "Vault Name"}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] md:w-[220px] p-0 ">
        <Command className="bg-card">
          <CommandList>
            <CommandInput placeholder="Search account actions..."></CommandInput>
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
