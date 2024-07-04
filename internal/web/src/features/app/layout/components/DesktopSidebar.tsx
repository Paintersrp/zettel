import { type FC } from "react"
import { Link, useRouter } from "@tanstack/react-router"
import {
  // BookOpenText,
  BrainIcon,
  FilePlus,
  // LinkIcon,
  NotebookTabs,
  Settings,
  Sheet,
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
  {
    to: "/app/notes/table",
    icon: <Sheet className="size-5" />,
    text: "Notes Table",
  },
  {
    to: "/app/notes/create",
    icon: <FilePlus className="size-5" />,
    text: "Create Note",
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
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-12 flex-col border-r bg-accent sm:flex">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-3">
        <Link
          to="/app"
          className="group mb-2 size-8 bg-accent inline-flex items-center duration-150 ease-in justify-center rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="flex items-center justify-center size-8 group-hover:text-primary text-muted-foreground">
            <BrainIcon className="size-7 text-primary" />
          </span>
          <span className="sr-only">Zethub</span>
        </Link>
        {desktopSidebarItems.map((item, index) => {
          const isActive = pathname === item.to

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
            icon: "text-muted-foreground group-hover:text-primary",
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
      <Link
        to={to}
        search={search}
        className="group size-8 bg-accent hover:bg-card inline-flex items-center duration-150 ease-in justify-center rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        <span
          className={cn(
            "flex items-center justify-center size-8 group-hover:text-primary text-muted-foreground",
            active && "text-primary"
          )}
        >
          {icon}
        </span>
        <span className="sr-only">{tooltip}</span>
      </Link>
    </TooltipWrapper>
  )
}

export default DesktopSidebar
