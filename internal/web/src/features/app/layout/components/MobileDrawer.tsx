import { Link, useRouter } from "@tanstack/react-router"
import {
  //  BookOpenText,
  BrainIcon,
  // Link as LinkIcon,
  LogOut,
  NotebookTabs,
  PanelLeft,
  Settings,
} from "lucide-react"

import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/Button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { GitHubIcon, TwitterIcon, VaultIcon } from "@/components/icons"
import { ThemeToggle } from "@/components/ThemeToggle"

const mobileDrawerTopItems = [
  {
    to: "/app/vaults",
    icon: (
      <span className="size-[22px]">
        <VaultIcon />
      </span>
    ),
    text: "Vaults",
  },
  {
    to: "/app/notes",
    icon: <NotebookTabs className="size-5" />,
    text: "Notes",
  },
  // {
  //   to: "#",
  //   icon: <LinkIcon className="size-5" />,
  //   text: "Sources",
  //   startsWith: "/sources",
  // },
  // {
  //   to: "#",
  //   icon: <BookOpenText className="size-5" />,
  //   text: "Public",
  //   startsWith: "/public",
  // },
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

export const MobileDrawer = () => {
  const router = useRouter()
  const pathname = router.state.location.pathname
  const { open, setOpen } = useReactiveOpen()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="iconSm" className="sm:hidden">
          <PanelLeft className="h-5 w-5 text-primary" />
          <span className="sr-only">Toggle User Menu</span>
        </Button>
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
          {mobileDrawerTopItems.map((item, index) => {
            const isActive = pathname.startsWith(item.to)

            return (
              <MobileDrawerItem
                key={`mobile-top-drawer-${index}`}
                active={isActive}
                {...item}
              />
            )
          })}
        </nav>
        <SheetFooter className="mt-4 justify-center flex flex-col w-full items-center">
          <nav className="grid text-lg font-medium w-full">
            {mobileDrawerBottomItems.map((item, index) => {
              const isActive = pathname.startsWith(item.to)

              return (
                <MobileDrawerItem
                  key={`mobile-bottom-drawer-${index}`}
                  active={isActive}
                  {...item}
                />
              )
            })}
          </nav>
          <ThemeToggle
            classes={{
              icon: "text-muted-foreground group-hover:text-primary",
              button: "group size-10 hover:bg-card",
            }}
          />
          <div className="flex flex-col justify-between items-center pt-4">
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
                <a href="#" className="hover:text-primary/90">
                  <TwitterIcon />
                </a>
              </li>
              <li className="size-6">
                <a href="#" className="hover:text-primary/90">
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
  active: boolean
}

const MobileDrawerItem: React.FC<MobileDrawerItemProps> = ({
  icon,
  to,
  text,
  active,
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-4 p-2.5 rounded text-muted-foreground hover:text-primary hover:bg-accent transition",
        active && "text-primary"
      )}
    >
      {icon}
      {text}
    </Link>
  )
}

MobileDrawerItem
export default MobileDrawer
