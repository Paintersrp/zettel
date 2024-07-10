import { Suspense } from "react"

import { getVaults } from "../lib/getVaults"
import { Breadcrumbs } from "./Breadcrumbs"
import MobileDrawer from "./MobileDrawer"
import ToggleQuickAccess from "./ToggleQuickAccess"
import ToggleSidePanel from "./ToggleSidePanel"
import UserMenu from "./UserMenu"
import UserMenuMobile from "./UserMenuMobile"
import VaultSwitcher from "./VaultSwitcher"

export const AppHeader = async () => {
  const vaults = await getVaults()

  return (
    <header className="sticky top-0 z-30 flex min-h-12 items-center gap-4 border-b bg-accent px-2 sm:px-4">
      <div className="flex gap-2 items-center w-full">
        <div className="hidden md:flex min-w-[200px] md:min-w-[220px]">
          <Suspense>
            <VaultSwitcher vaults={vaults} />
          </Suspense>
        </div>
        <Suspense>
          <Breadcrumbs />
        </Suspense>
        <Suspense>
          <MobileDrawer />
        </Suspense>
      </div>
      <div className="flex justify-end gap-2">
        <div className="flex md:hidden">
          <Suspense>
            <UserMenuMobile />
          </Suspense>
        </div>
        <div className="md:flex hidden">
          <Suspense>
            <UserMenu />
          </Suspense>
        </div>

        <Suspense>
          <ToggleSidePanel />
        </Suspense>
        <Suspense>
          <ToggleQuickAccess />
        </Suspense>
      </div>
    </header>
  )
}

export default AppHeader
