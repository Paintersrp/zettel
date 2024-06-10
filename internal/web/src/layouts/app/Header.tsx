import { LogOut, Search, SettingsIcon, UserCog } from "lucide-react"

import { formatVaultName } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Input } from "@/components/ui/Input"
import { useAuth } from "@/components/providers/AuthProvider"
import { VaultSwitcher } from "@/components/VaultSwitcher"

import MobileDrawer from "./MobileDrawer"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { user } = useAuth()
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-page px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-8">
      <MobileDrawer />
      <div className="hidden sm:flex w-[240px] md:w-[260px]">
        <VaultSwitcher />
      </div>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 size-4 text-primary" />
        <Input
          type="search"
          placeholder={`Search ${user?.active_vault ? formatVaultName(user?.active_vault?.name) : ".."}`}
          className="h-9 w-full rounded bg-contrast pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="btn-secondary text-primary hover:bg-contrast-hover bg-contrast px-1.5 py-1.5 h-9">
            <UserCog className="size-5 text-primary" />
            <span className="sr-only">Toggle Settings Menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex flex-col gap-0.5">
            <span>My Account</span>
            <span className="font-normal">{user?.email}</span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between group">
            Settings
            <SettingsIcon className="size-4 group-hover:text-primary" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between group">
            Logout
            <LogOut className="size-4 group-hover:text-primary" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
