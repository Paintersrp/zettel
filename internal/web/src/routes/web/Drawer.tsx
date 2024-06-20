import React, { useEffect, useState } from "react"
import { Link, useRouter } from "@tanstack/react-router"
import {
  BrainIcon,
  FileAxis3d,
  HomeIcon,
  LogInIcon,
  MenuIcon,
  UserPlus,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { GitHubIcon, TwitterIcon } from "@/components/icons"

interface DrawerProps {}

const Drawer: React.FC<DrawerProps> = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [router.state.location])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="btn-secondary text-primary border-none px-2 py-2 ml-2">
        <MenuIcon className="size-6 text-primary" />
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
                    <DrawerListItem
                      text="Home"
                      to="/"
                      icon={<HomeIcon className="size-6 text-primary" />}
                    />
                    <DrawerListItem
                      text="Docs"
                      to="/docs"
                      icon={<FileAxis3d className="size-6 text-primary" />}
                    />
                  </ul>
                </nav>
              </div>

              <nav className="w-full mt-4">
                <ul className="space-y-2 w-full">
                  <DrawerListItem
                    text="Login"
                    to="/login"
                    icon={<LogInIcon className="size-6 text-primary" />}
                  />
                  <DrawerListItem
                    text="Register"
                    to="/register"
                    icon={<UserPlus className="size-6 text-primary" />}
                  />
                </ul>
              </nav>
            </div>
          </div>
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
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface DrawerListItemProps {
  text: string
  to: string
  params?: unknown
  icon: React.ReactNode
}

const DrawerListItem: React.FC<DrawerListItemProps> = ({
  text,
  to,
  params,
  icon,
}) => {
  return (
    <li>
      <Link
        to={to}
        params={params ?? {}}
        className="flex gap-4 items-center justify-between px-4 py-2 text-muted rounded hover:bg-contrast"
      >
        {text}
        {icon}
      </Link>
    </li>
  )
}

export default Drawer
