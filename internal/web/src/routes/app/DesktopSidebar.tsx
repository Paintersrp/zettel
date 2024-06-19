import React from "react"
import { Link, useRouter } from "@tanstack/react-router"
import {
  BookOpenText,
  BrainIcon,
  LinkIcon,
  NotebookTabs,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { VaultIcon } from "@/components/icons"
import { ThemeToggle } from "@/components/ThemeToggle"

const desktopSidebarItems = [
  {
    to: "/vaults",
    icon: (
      <span className="size-[22px]">
        <VaultIcon />
      </span>
    ),
    text: "Vaults",
    startsWith: "/vaults",
  },
  {
    to: "/notes",
    search: { filter: "all" },
    icon: <NotebookTabs className="size-5" />,
    text: "Notes",
    startsWith: "/notes",
  },
  {
    to: "/sources",
    icon: <LinkIcon className="size-5" />,
    text: "Sources",
    startsWith: "/sources",
  },
  {
    to: "/public",
    icon: <BookOpenText className="size-5" />,
    text: "Public",
    startsWith: "/public",
  },
]

interface DesktopSidebarProps {}

const DesktopSidebar: React.FC<DesktopSidebarProps> = () => {
  const router = useRouter()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-contrast sm:flex">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5">
        <div className="mb-6">
          <span className="flex items-center justify-center text-primary">
            <BrainIcon className="size-7 text-primary" />
          </span>
          <span className="sr-only">Zethub</span>
        </div>
        {desktopSidebarItems.map((item, index) => (
          <DesktopSidebarItem
            key={`desktop-sidebar-${index}`}
            to={item.to}
            search={item.search}
            icon={item.icon}
            tooltip={item.text}
            active={router.state.location.pathname.startsWith(item.startsWith)}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-2 px-2 sm:py-5">
        <ThemeToggle
          classes={{
            icon: "text-muted group-hover:text-primary",
            button: "group",
          }}
        />

        <DesktopSidebarItem
          to="/account/profile"
          icon={<Settings className="size-5" />}
          tooltip="Settings"
          active={router.state.location.pathname.startsWith("/account")}
        />
      </nav>
    </aside>
  )
}

interface DesktopSidebarItemProps {
  icon: React.ReactNode
  to: string
  search?: any
  tooltip: string
  active: boolean
}

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
  icon,
  to,
  search,
  tooltip,
  active,
}) => {
  return (
    <TooltipWrapper content={tooltip} side="right">
      <Link to={to} search={search}>
        <div className="group btn-secondary px-2 py-2 text-primary border-none flex size-9 shrink-0 items-center justify-center gap-2 font-semibold hover:bg-page">
          <span
            className={cn(
              "flex items-center justify-center size-9 group-hover:text-primary text-muted",
              active && "text-primary"
            )}
          >
            {icon}
          </span>
          <span className="sr-only">{tooltip}</span>
        </div>
      </Link>
    </TooltipWrapper>
  )
}

export default DesktopSidebar
