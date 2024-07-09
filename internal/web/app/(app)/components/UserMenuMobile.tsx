"use client"

import { useReactiveOpen } from "@/hooks/useReactiveOpen"

import { userMenuItems } from "./user-menu-items"
import UserMenuDrawer from "./UserMenuDrawer"

export const UserMenuMobile = () => {
  const menu = useReactiveOpen()

  return (
    <UserMenuDrawer
      open={menu.open}
      setOpen={menu.setOpen}
      items={userMenuItems}
    />
  )
}

export default UserMenuMobile
