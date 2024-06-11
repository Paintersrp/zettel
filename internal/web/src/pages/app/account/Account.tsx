import { createRoute, Outlet } from "@tanstack/react-router"

import { Separator } from "@/components/ui/Separator"
import { SettingsIcon } from "@/components/icons"
import { appLayout } from "@/pages/app/App"

import Sidebar from "./AccountSidebar"

export const accountLayout = createRoute({
  getParentRoute: () => appLayout,
  id: "account-layout",
  component: () => <AccountLayout />,
})

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

export const AccountLayout = ({}: AccountLayoutProps) => {
  return (
    <div className="hidden space-y-6 py-4 md:block w-full">
      <div className="flex items-center gap-2">
        <span className="size-10 text-primary">
          <SettingsIcon />
        </span>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-[#898991]">Manage your account settings.</p>
        </div>
      </div>
      <Separator className="my-6" />
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
