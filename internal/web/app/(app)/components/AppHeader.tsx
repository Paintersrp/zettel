import { Suspense } from "react"

import { getVaults } from "@/lib/vault/queries/getVaults"

import { Breadcrumbs } from "./Breadcrumbs"
import { MobileDrawer } from "./MobileDrawer"
import { QuickAccessToggle } from "./quickAccess/QuickAccessToggle"
import { SidePanelToggle } from "./sidepanel/SidePanelToggle"
import { UserMenu } from "./UserMenu"
import { UserMenuMobile } from "./UserMenuMobile"
import { VaultSwitcher } from "./vaults/VaultSwitcher"
import { VaultSwitcherSkeleton } from "./vaults/VaultSwitcherSkeleton"

// TODO: Fix Suspense

export const AppHeader = () => {
  const vaults = getVaults()

  return (
    <header className="sticky top-0 z-30 flex min-h-12 items-center gap-4 border-b bg-accent px-2 sm:px-4">
      <div className="flex gap-2 items-center w-full">
        <div className="hidden md:flex min-w-[200px] md:min-w-[220px]">
          <Suspense fallback={<VaultSwitcherSkeleton />}>
            <VaultSwitcher vaults={vaults} />
          </Suspense>
        </div>
        <Breadcrumbs />
        <MobileDrawer />
      </div>
      <div className="flex justify-end gap-2">
        <div className="flex md:hidden">
          <UserMenuMobile />
        </div>
        <div className="md:flex hidden">
          <UserMenu />
        </div>
        <SidePanelToggle />
        <QuickAccessToggle />
      </div>
    </header>
  )
}

export default AppHeader
