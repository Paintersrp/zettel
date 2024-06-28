import { Command, PanelRight } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { useQuickAccess } from "@/features/app/layout/stores/quickAccess"
import { useSidePanel } from "@/features/app/layout/stores/sidePanel"
import { VaultSwitcher } from "@/features/app/vaults/components/VaultSwitcher"

import { Breadcrumbs } from "./Breadcrumbs"
import { MobileDrawer } from "./MobileDrawer"
import { UserMenu } from "./UserMenu"

export const AppHeader = () => {
  const { setOpen } = useQuickAccess()
  const { openPanel, closePanel, sidePanel } = useSidePanel()

  const onPanelClick = () => {
    if (sidePanel.isOpen) {
      closePanel()
    } else {
      openPanel("search", "")
    }
  }

  return (
    <header className="sticky top-0 z-30 flex min-h-12 items-center gap-4 border-b bg-accent px-2 sm:static sm:h-auto sm:px-4">
      <div className="flex gap-2 items-center w-full">
        <div className="flex min-w-[200px] md:min-w-[220px]">
          <VaultSwitcher />
        </div>
        <Breadcrumbs />
        <MobileDrawer />
      </div>
      <div className="flex justify-end gap-2">
        <UserMenu />
        <Button
          variant="outline"
          className="px-1.5 py-1.5 h-9"
          onClick={onPanelClick}
        >
          <PanelRight className="size-5 text-primary" />
          <span className="sr-only">Toggle Side Panel</span>
        </Button>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="px-1.5 py-1.5 h-9"
        >
          <Command className="size-5 text-primary" />
          <span className="sr-only">Toggle Settings Menu</span>
        </Button>
      </div>
    </header>
  )
}

export default AppHeader
