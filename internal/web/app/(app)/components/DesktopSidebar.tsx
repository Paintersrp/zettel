import { Suspense } from "react"
import Link from "next/link"
import {
  // BookOpenText,
  BrainIcon,
  FilePlus,
  // LinkIcon,
  NotebookTabs,
  Settings,
  Sheet,
} from "lucide-react"

import { VaultIcon } from "@/components/icons"
import { ThemeToggle } from "@/components/ThemeToggle"

import { DesktopSidebarItem } from "./DesktopSidebarItem"

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
    to: "/app/notes?filter=all",
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
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-12 flex-col border-r bg-accent sm:flex">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-3">
        <Link
          href="/app"
          className="group mb-2 size-8 bg-accent inline-flex items-center duration-150 ease-in justify-center rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="flex items-center justify-center size-8 group-hover:text-primary text-muted-foreground">
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
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-2 px-2 sm:py-5">
        <Suspense>
          <ThemeToggle
            classes={{
              icon: "text-muted-foreground group-hover:text-primary",
              button: "group hover:bg-primary/10 bg-accent",
            }}
          />
        </Suspense>

        <DesktopSidebarItem
          to="/app/account/profile"
          icon={<Settings className="size-5" />}
          tooltip="Settings"
        />
      </nav>
    </aside>
  )
}

export default DesktopSidebar
