import { Suspense } from "react"
import Link from "next/link"
import { BrainIcon, MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ThemeToggle"

import WebDrawer from "./WebDrawer"
import WebHeaderAppButton from "./WebHeaderAppButton"

export const WebHeader = () => {
  return (
    <header className="flex items-center w-full h-16 select-none">
      <div className="container px-4 sm:px-8 relative flex flex-wrap items-center justify-between w-full mx-auto font-medium md:items-center h-16 md:justify-between">
        <div className="flex gap-4">
          <Link
            href="/"
            className="flex items-center space-x-2 font-extrabold md:py-0"
          >
            <BrainIcon className="size-8 text-primary" />
            <span className="text-xl uppercase">Zethub</span>
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          <Suspense fallback={null}>
            <WebHeaderAppButton />
          </Suspense>

          <Suspense fallback={null}>
            <ThemeToggle
              classes={{
                icon: "text-primary",
                button: "bg-accent hover:bg-card",
              }}
            />
          </Suspense>
          <Suspense
            fallback={
              <Button size="iconSm" variant="ghost">
                <MenuIcon className="size-6 text-primary" />
                <span className="sr-only">Open Menu</span>
              </Button>
            }
          >
            <WebDrawer />
          </Suspense>
        </div>
      </div>
    </header>
  )
}

export default WebHeader
