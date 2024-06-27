import { Link } from "@tanstack/react-router"
import { BrainIcon } from "lucide-react"

import { ThemeToggle } from "@/components/ThemeToggle"

import { WebDrawer } from "./WebDrawer"

export const WebHeader = () => {
  return (
    <header className="flex items-center w-full h-16 select-none">
      <div className="container px-4 sm:px-8 relative flex flex-wrap items-center justify-between w-full mx-auto font-medium md:items-center h-16 md:justify-between">
        <div className="flex gap-4">
          <Link
            to="/"
            className="flex items-center space-x-2 font-extrabold md:py-0"
          >
            <BrainIcon className="size-8 text-primary" />
            <span className="text-xl uppercase">Zethub</span>
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          <ThemeToggle
            classes={{
              icon: "text-primary",
            }}
          />
          <WebDrawer />
        </div>
      </div>
    </header>
  )
}

export default WebHeader
