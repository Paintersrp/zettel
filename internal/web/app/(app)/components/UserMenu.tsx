"use client"

import {
  Fingerprint,
  KeySquare,
  LockKeyhole,
  LogOut,
  UserCog,
} from "lucide-react"

import { useReactiveOpen } from "@/hooks/useReactiveOpen"

import UserMenuCombo from "./UserMenuCombo"

export const userMenuItems = [
  {
    to: "/app/account/profile",
    icon: <UserCog className="mr-2 size-5 md:size-4 text-primary" />,
    text: "Update Profile",
  },
  {
    to: "/app/account/password",
    icon: <LockKeyhole className="mr-2 size-5 md:size-4 text-primary" />,
    text: "Change Password",
  },
  {
    to: "/app/account/providers",
    icon: <Fingerprint className="mr-2 size-5 md:size-4 text-primary" />,
    text: "Manage Providers",
  },
  {
    to: "/app/account/keys",
    icon: <KeySquare className="mr-2 size-5 md:size-4 text-primary" />,
    text: "Manage SSH Keys",
  },
  {
    to: "http://localhost:6474/v1/auth/logout",
    icon: <LogOut className="mr-2 size-5 md:size-4 text-primary" />,
    text: "Logout",
  },
]

// TODO: Is This Needed?
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
