import type { FC, ReactNode } from "react"
import { SquareUser } from "lucide-react"

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
import { MenuLink } from "@/components/MenuItems"
import { useAuth } from "@/features/auth/providers"

interface UserMenuDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
  items: { to: string; text: string; icon: ReactNode }[]
}

export const UserMenuDrawer: FC<UserMenuDrawerProps> = ({
  open,
  setOpen,
  items,
}) => {
  const { user } = useAuth()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="iconSm">
          <SquareUser className="size-5 text-primary" />
          <span className="sr-only">Toggle Settings Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg">Account</DrawerTitle>
          <DrawerDescription>{user?.email}</DrawerDescription>
        </DrawerHeader>
        <nav className="grid p-2">
          {items.map((item, index) => (
            <MenuLink
              key={`$usermenu-${index}`}
              to={item.to}
              className="flex items-center justify-between gap-4 p-2.5 rounded text-muted-foreground hover:text-primary hover:bg-accent transition"
            >
              {item.text}
              {item.icon}
            </MenuLink>
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

export default UserMenuDrawer
