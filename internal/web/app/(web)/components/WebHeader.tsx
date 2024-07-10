import { Suspense } from "react"
import Link from "next/link"
import { BrainIcon, MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ThemeToggle"

import WebDrawer from "./WebDrawer"
import WebHeaderAppButton from "./WebHeaderAppButton"

export const WebHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent/80 backdrop-blur-sm">
      <div className="container px-4 sm:px-8 flex items-center justify-between w-full mx-auto h-16">
        <div className="flex gap-4">
          <Link href="/" className="flex items-center space-x-2 font-extrabold">
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
