import { type FC } from "react"
import { Link, useRouter } from "@tanstack/react-router"
import {
  // BookOpenText,
  BrainIcon,
  // LinkIcon,
  NotebookTabs,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { TooltipWrapper } from "@/components/ui/Tooltip"
import { VaultIcon } from "@/components/icons"
import { ThemeToggle } from "@/components/ThemeToggle"

const desktopSidebarItems = [
  {
    to: "/app/vaults",
    icon: (
      <span className="size-[22px]">
        <VaultIcon />
      </span>
    ),
    text: "Vaults",
  },
  {
    to: "/app/notes",
    search: { filter: "all" },
    icon: <NotebookTabs className="size-5" />,
    text: "Notes",
  },
  // {
  //   to: "/sources",
  //   icon: <LinkIcon className="size-5" />,
  //   text: "Sources",
  // },
  // {
  //   to: "/public",
  //   icon: <BookOpenText className="size-5" />,
  //   text: "Public",
  // },
]

export const DesktopSidebar = () => {
  const router = useRouter()
  const pathname = router.state.location.pathname

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-contrast sm:flex">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-6">
        <div className="mb-6">
          <BrainIcon className="size-7 text-primary" />
          <span className="sr-only">Zethub</span>
        </div>
        {desktopSidebarItems.map((item, index) => {
          const isActive = pathname.startsWith(item.to)

          return (
            <DesktopSidebarItem
              key={`desktop-sidebar-${index}`}
              to={item.to}
              search={item.search}
              icon={item.icon}
              tooltip={item.text}
              active={isActive}
            />
          )
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-2 px-2 sm:py-5">
        <ThemeToggle
          classes={{
            icon: "text-muted group-hover:text-primary",
            button: "group",
          }}
        />

        <DesktopSidebarItem
          to="/app/account/profile"
          icon={<Settings className="size-5" />}
          tooltip="Settings"
          active={pathname.startsWith("/app/account")}
        />
      </nav>
    </aside>
  )
}

interface DesktopSidebarItemProps {
  icon: React.ReactNode
  to: string
  search?: { filter: string }
  tooltip: string
  active: boolean
}

const DesktopSidebarItem: FC<DesktopSidebarItemProps> = ({
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
