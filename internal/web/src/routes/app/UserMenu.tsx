import React from "react"
import {
  Fingerprint,
  KeySquare,
  LockKeyhole,
  LogOut,
  UserCog,
} from "lucide-react"

import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"

import { UserMenuCombo } from "./UserMenuCombo"
import { UserMenuDrawer } from "./UserMenuDrawer"

const userMenuItems = [
  {
    to: "/account/profile",
    icon: <UserCog className="mr-2 size-5 md:size-4" />,
    text: "Update Profile",
  },
  {
    to: "/account/password",
    icon: <LockKeyhole className="mr-2 size-5 md:size-4" />,
    text: "Change Password",
  },
  {
    to: "/account/providers",
    icon: <Fingerprint className="mr-2 size-5 md:size-4" />,
    text: "Manage Providers",
  },
  {
    to: "/account/keys",
    icon: <KeySquare className="mr-2 size-5 md:size-4" />,
    text: "Manage SSH Keys",
  },
  {
    to: "http://localhost:6474/v1/auth/logout",
    icon: <LogOut className="mr-2 size-5 md:size-4" />,
    text: "Logout",
  },
]

interface UserMenuProps {}

export const UserMenu: React.FC<UserMenuProps> = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const menu = useReactiveOpen()

  if (isDesktop) {
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

  return (
    <UserMenuDrawer
      open={menu.open}
      setOpen={menu.setOpen}
      items={userMenuItems}
    />
  )
}

export default UserMenu
