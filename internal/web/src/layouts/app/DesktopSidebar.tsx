import React from "react"
import { Link } from "@tanstack/react-router"
import { BrainIcon, Settings } from "lucide-react"

import { TooltipWrapper } from "@/components/ui/Tooltip"
import { VaultIcon } from "@/components/icons"

const desktopSidebarItems = [
  { to: "#", icon: <VaultIcon />, tooltip: "Active Vault" },
]

interface DesktopSidebarProps {}

const DesktopSidebar: React.FC<DesktopSidebarProps> = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-contrast sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link href="#">
          <span className="flex items-center justify-center text-primary">
            <BrainIcon className="size-7 text-primary" />
          </span>
          <span className="sr-only">Zethub</span>
        </Link>
        {desktopSidebarItems.map((item) => (
          <DesktopSidebarItem
            to={item.to}
            icon={item.icon}
            tooltip={item.tooltip}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <DesktopSidebarItem
          to="settings"
          icon={<Settings className="size-5" />}
          tooltip="Settings"
        />
      </nav>
    </aside>
  )
}

interface DesktopSidebarItemProps {
  icon: React.ReactNode
  to: string
  tooltip: string
}

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
  icon,
  to,
  tooltip,
}) => {
  return (
    <TooltipWrapper content={tooltip} side="right">
      <Link to={to} href="#">
        <div className="group btn-secondary px-2 py-2 text-primary border-none flex size-9 shrink-0 items-center justify-center gap-2 font-semibold hover:bg-page">
          <span className="flex items-center justify-center size-9 text-primary">
            {icon}
          </span>
          <span className="sr-only">{tooltip}</span>
        </div>
      </Link>
    </TooltipWrapper>
  )
}

export default DesktopSidebar
