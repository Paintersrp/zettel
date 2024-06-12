import { Outlet } from "@tanstack/react-router"

import { Separator } from "@/components/ui/Separator"
import { SettingsIcon } from "@/components/icons"

import Sidebar from "./AccountSidebar"

const sidebarNavItems = [
  {
    title: "User Profile",
    href: "/account/profile",
  },
  {
    title: "Change Password",
    href: "/account/password",
  },
  {
    title: "Social Login Providers",
    href: "/account/providers",
  },
  {
    title: "Security Keys (SSH)",
    href: "/account/keys",
  },
]

interface AccountLayoutProps {}

const AccountLayout = ({}: AccountLayoutProps) => {
  return (
    <div className="space-y-3 sm:space-y-6 py-4 w-full">
      <div className="flex items-center gap-2">
        <span className="size-8 sm:size-10 text-primary">
          <SettingsIcon />
        </span>
        <div className="space-y-0.5">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Settings
          </h2>
          <p className="sm:text-base text-sm text-muted">
            Manage your account settings.
          </p>
        </div>
      </div>
      <Separator className="" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-10 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <Sidebar items={sidebarNavItems} />
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
