"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import {
  BrainIcon,
  FileAxis3d,
  HomeIcon,
  LogInIcon,
  MenuIcon,
  UserPlus,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { GitHubIcon, TwitterIcon } from "@/components/icons"

import WebDrawerAuthButtons from "./WebDrawerAuthButtons"
import { WebDrawerItem } from "./WebDrawerItem"

export const WebDrawer = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="iconSm"
          variant="ghost"
          className="bg-accent hover:bg-card"
        >
          <MenuIcon className="size-6 text-primary" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[340px] sm:max-w-[320px] h-full flex flex-col">
        <div className="flex flex-col h-full justify-between">
          <BrainIcon className="size-8 text-primary" />
          <div className="flex-grow">
            <div className="flex flex-col justify-between h-full">
              <div>
                <nav className="w-full mt-4">
                  <h2 className="text-lg text-primary mb-1">
                    Welcome to Zethub
                  </h2>
                  <ul>
                    <WebDrawerItem
                      text="Home"
                      to="/"
                      icon={<HomeIcon className="size-6 text-primary" />}
                    />
                    <WebDrawerItem
                      text="Docs"
                      to="/docs"
                      icon={<FileAxis3d className="size-6 text-primary" />}
                    />
                  </ul>
                </nav>
              </div>

              <WebDrawerAuthButtons />
            </div>
          </div>
          <SheetFooter className="mt-4 justify-center flex flex-col w-full items-center">
            <div className="flex flex-col justify-between items-center">
              <div className="text-[0.8rem] text-muted-foreground">
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
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default WebDrawer
