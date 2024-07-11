"use client"

import { useReactiveOpen } from "@/hooks/useReactiveOpen"

import { userMenuItems } from "./UserMenu"
import UserMenuDrawer from "./UserMenuDrawer"

// TODO: Is This Needed?

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
