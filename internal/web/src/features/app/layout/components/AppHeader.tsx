import { Command } from "lucide-react"

import { useQuickAccess } from "@/features/app/layout/stores/quickAccess"
import { VaultSwitcher } from "@/features/app/vaults/components/VaultSwitcher"

import { Breadcrumbs } from "./Breadcrumbs"
import { MobileDrawer } from "./MobileDrawer"
import { UserMenu } from "./UserMenu"

export const AppHeader = () => {
  const { setOpen } = useQuickAccess()

  return (
    <header className="sticky top-0 z-30 flex min-h-14 items-center gap-4 border-b bg-page px-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-8 sm:mt-2 sm:-mb-2">
      <div className="flex gap-2 items-center w-full">
        <Breadcrumbs />
        <MobileDrawer />
        <div className="flex min-w-[200px] md:min-w-[220px]">
          <VaultSwitcher />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <UserMenu />
        <button
          onClick={() => setOpen(true)}
          className="btn-secondary text-primary hover:bg-contrast-hover bg-contrast px-1.5 py-1.5 h-9"
        >
          <Command className="size-5 text-primary" />
          <span className="sr-only">Toggle Settings Menu</span>
        </button>
      </div>
    </header>
  )
}

export default AppHeader
