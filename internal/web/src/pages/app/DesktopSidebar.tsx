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

const desktopSidebarItems = [
  {
    to: "/notes",
    icon: <NotebookTabs className="size-5" />,
    text: "Notes",
    startsWith: "/notes",
  },
  {
    to: "#",
    icon: <LinkIcon className="size-5" />,
    text: "Sources",
    startsWith: "/sources",
  },
  {
    to: "#",
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
        <Link href="#" className="mb-6">
          <span className="flex items-center justify-center text-primary">
            <BrainIcon className="size-7 text-primary" />
          </span>
          <span className="sr-only">Zethub</span>
        </Link>
        {desktopSidebarItems.map((item, index) => (
          <DesktopSidebarItem
            key={`desktop-sidebar-${index}`}
            to={item.to}
            icon={item.icon}
            tooltip={item.text}
            active={router.state.location.pathname.startsWith(item.startsWith)}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
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
  tooltip: string
  active: boolean
}

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
  icon,
  to,
  tooltip,
  active,
}) => {
  return (
    <TooltipWrapper content={tooltip} side="right">
      <Link to={to}>
        <div className="group btn-secondary px-2 py-2 text-primary border-none flex size-9 shrink-0 items-center justify-center gap-2 font-semibold hover:bg-page">
          <span
            className={cn(
              "flex items-center justify-center size-9 group-hover:text-primary",
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
