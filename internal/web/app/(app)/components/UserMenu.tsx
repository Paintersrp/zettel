"use client"

import { useReactiveOpen } from "@/hooks/useReactiveOpen"

import { userMenuItems } from "./user-menu-items"
import UserMenuCombo from "./UserMenuCombo"

export const UserMenu = () => {
  const menu = useReactiveOpen()

  return (
    <div className="flex min-w-[200px] md:min-w-[220px]">
      <UserMenuCombo
        open={menu.open}
        setOpen={menu.setOpen}
        items={userMenuItems}
      />
    </div>
  )
}

export default UserMenu
