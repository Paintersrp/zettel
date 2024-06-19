import React from "react"
import { Link } from "@tanstack/react-router"
import { LogOut, SettingsIcon, UserCog } from "lucide-react"

import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { Button } from "@/components/ui/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { useAuth } from "@/components/providers/AuthProvider"

const userMenuItems = [
  {
    to: "/account/profile",
    icon: <SettingsIcon className="size-5" />,
    text: "Settings",
  },
  {
    to: "http://localhost:6474/v1/auth/logout",
    icon: <LogOut className="size-5" />,
    text: "Logout",
  },
]

interface UserMenuProps {}

// TODO: Segment UserDropdown / UserDrawer / UserMenu
const UserMenu: React.FC<UserMenuProps> = () => {
  const { user } = useAuth()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const { open: drawerOpen, setOpen: setDrawerOpen } = useReactiveOpen()
  const { open: dropdownOpen, setOpen: setDropdownOpen } = useReactiveOpen()

  if (isDesktop) {
    return (
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button className="btn-secondary text-primary hover:bg-contrast-hover bg-contrast px-1.5 py-1.5 h-9">
            <UserCog className="size-5 text-primary" />
            <span className="sr-only">Toggle Settings Menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex flex-col gap-0.5 text-primary">
            <span>Account</span>
            <span className="font-normal text-default">{user?.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userMenuItems.map((item, index) => (
            <DropdownMenuItem key={`$usermenu-${index}`}>
              <MenuItem
                className="flex w-full items-center justify-between gap-4 rounded hover:text-primary hover:bg-contrast-hover transition"
                {...item}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <button className="btn-secondary text-primary hover:bg-contrast-hover bg-contrast px-1.5 py-1.5 h-9">
          <UserCog className="size-5 text-primary" />
          <span className="sr-only">Toggle Settings Menu</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg">Account</DrawerTitle>
          <DrawerDescription>{user?.email}</DrawerDescription>
        </DrawerHeader>
        <nav className="grid p-2">
          {userMenuItems.map((item, index) => (
            <MenuItem
              key={`$usermenu-${index}`}
              className="flex items-center justify-between gap-4 p-2.5 rounded text-muted hover:text-primary hover:bg-contrast-hover transition"
              {...item}
            />
          ))}
        </nav>
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="outline" className="hover:text-primary">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface MenuItemProps {
  text: string
  to: string
  icon: React.ReactNode
  className?: string
}

const MenuItem: React.FC<MenuItemProps> = ({ text, to, icon, className }) => {
  return (
    <Link to={to} className={className}>
      {text}
      {icon}
    </Link>
  )
}

//

export default UserMenu
