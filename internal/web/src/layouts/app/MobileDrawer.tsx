import React from "react"
import { Link } from "@tanstack/react-router"
import {
  BrainIcon,
  Home,
  LineChart,
  Package,
  PanelLeft,
  ShoppingCart,
  Users2,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { GitHubIcon, TwitterIcon } from "@/components/icons"
import { VaultSwitcher } from "@/components/VaultSwitcher"

interface MobileDrawerProps {}

const MobileDrawer: React.FC<MobileDrawerProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="btn-secondary text-primary border-none px-2 py-2 sm:hidden">
          <PanelLeft className="h-5 w-5 text-primary" />
          <span className="sr-only">Toggle Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="max-w-[340px] sm:max-w-[320px] justify-between flex flex-col"
      >
        <nav className="grid gap-6 text-lg font-medium">
          <Link href="#" className="group flex items-center gap-2">
            <span className="flex items-center justify-center text-primary">
              <BrainIcon className="size-8 text-primary" />
            </span>

            <span className="uppercase font-bold text-2xl">Zethub</span>
          </Link>
          <div className="w-[240px] md:w-[260px]">
            <VaultSwitcher />
          </div>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted hover:text-primary transition"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted hover:text-primary transition"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted hover:text-primary transition"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted hover:text-primary transition"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted hover:text-primary transition"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
        <SheetFooter className="mt-4 justify-center flex flex-col w-full items-center">
          <div className="flex flex-col justify-between items-center">
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

export default MobileDrawer
