import { rootRoute } from "@/root"
import { createRoute, Outlet } from "@tanstack/react-router"

import { Separator } from "@/components/ui/Separator"

import BaseLayout from "../base/Base"
import Sidebar from "./Sidebar"

export const accountLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "account-layout",
  component: () => <AccountLayout />,
})

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/account/profile",
  },
  {
    title: "Security Keys",
    href: "/account/keys",
  },
]

interface AccountLayoutProps {}

export const AccountLayout = ({}: AccountLayoutProps) => {
  return (
    <BaseLayout>
      <div className="hidden space-y-6 py-4 md:block w-full">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-[#898991]">Manage your account settings.</p>
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
    </BaseLayout>
  )
}
