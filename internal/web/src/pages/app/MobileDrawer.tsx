import React from "react"
import { Link } from "@tanstack/react-router"
import {
  BookOpenText,
  BrainIcon,
  Link as LinkIcon,
  LogOut,
  NotebookTabs,
  PanelLeft,
  Settings,
} from "lucide-react"

import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { GitHubIcon, TwitterIcon } from "@/components/icons"
import { VaultSwitcher } from "@/components/VaultSwitcher"

const mobileDrawerTopItems = [
  { to: "/notes", icon: <NotebookTabs className="size-5" />, text: "Notes" },
  { to: "#", icon: <LinkIcon className="size-5" />, text: "Sources" },
  { to: "#", icon: <BookOpenText className="size-5" />, text: "Public" },
]

const mobileDrawerBottomItems = [
  {
    to: "/account/profile",
    icon: <Settings className="size-5" />,
    text: "Account",
  },
  {
    to: "http://localhost:6474/v1/auth/logout",
    icon: <LogOut className="size-5" />,
    text: "Logout",
  },
]

interface MobileDrawerProps {}

const MobileDrawer: React.FC<MobileDrawerProps> = () => {
  const { open, setOpen } = useReactiveOpen()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="btn-secondary text-primary hover:bg-contrast-hover bg-contrast px-1.5 py-1.5 h-9 sm:hidden">
          <PanelLeft className="h-5 w-5 text-primary" />
          <span className="sr-only">Toggle User Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="max-w-[340px] sm:max-w-[320px] justify-between flex flex-col"
      >
        <nav className="grid text-lg font-medium">
          <Link href="#" className="group flex items-center gap-2">
            <span className="flex items-center justify-center text-primary">
              <BrainIcon className="size-8 text-primary" />
            </span>
            <span className="uppercase font-bold text-2xl">Zethub</span>
          </Link>
          <div className="w-[240px] md:w-[260px] py-2.5">
            <VaultSwitcher />
          </div>
          {mobileDrawerTopItems.map((item, index) => (
            <MobileDrawerItem key={`mobile-top-drawer-${index}`} {...item} />
          ))}
        </nav>
        <SheetFooter className="mt-4 justify-center flex flex-col w-full items-center">
          <nav className="grid text-lg font-medium w-full">
            {mobileDrawerBottomItems.map((item, index) => (
              <MobileDrawerItem
                key={`mobile-bottom-drawer-${index}`}
                {...item}
              />
            ))}
          </nav>
          <div className="flex flex-col justify-between items-center pt-4">
            <div className="text-[0.8rem] text-muted">
              &copy; 2024 Zethub. All Rights Reserved.
            </div>
            <div className="flex justify-center items-center mt-2 text-xs font-medium text-primary">
              <a href="#" className="">
                Privacy Policy
              </a>
              <span className="mx-2">|</span>
              <a href="#" className="">
                Terms of Use
              </a>
            </div>
          </div>
          <div className="w-full text-center mt-4">
            <ul className="text-sm flex justify-center text-primary">
              <li className="mr-4 size-6">
                <a href="#" className="hover:text-primary-hover">
                  <TwitterIcon />
                </a>
              </li>
              <li className="size-6">
                <a href="#" className="hover:text-primary-hover">
                  <GitHubIcon />
                </a>
              </li>
            </ul>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

interface MobileDrawerItemProps {
  icon: React.ReactNode
  to: string
  text: string
}

const MobileDrawerItem: React.FC<MobileDrawerItemProps> = ({
  icon,
  to,
  text,
}) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-2.5 rounded text-muted hover:text-primary hover:bg-contrast-hover transition"
    >
      {icon}
      {text}
    </Link>
  )
}

MobileDrawerItem
export default MobileDrawer
