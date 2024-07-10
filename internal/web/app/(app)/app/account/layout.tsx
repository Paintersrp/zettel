import { ReactNode } from "react"
import { SettingsIcon } from "lucide-react"

import { Separator } from "@/components/ui/Separator"

import AccountSidebar from "./components/AccountSidebar"

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="space-y-2 sm:space-y-4 py-2 w-full px-4 bg-accent">
      <div className="flex items-center gap-2">
        <SettingsIcon className="size-8 sm:size-10 text-primary" />
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account settings.
          </p>
        </div>
      </div>
      <Separator className="" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-10 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/4">
          <AccountSidebar />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

export default AccountLayout
