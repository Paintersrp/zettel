import { Link } from "@tanstack/react-router"

import BrainIcon from "@/components/icons/Brain"
import { useAuth } from "@/components/providers/AuthProvider"

import Drawer from "./Drawer"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const auth = useAuth()

  return (
    <header className="flex items-center w-full h-16 select-none border-b mb-2">
      <div className="container px-4 sm:px-8 relative flex flex-wrap items-center justify-between w-full mx-auto font-medium md:items-center md:h-16 md:justify-between">
        <Link
          to="/"
          className="flex items-center w-1/4 space-x-2 font-extrabold md:py-0"
        >
          <span className="flex items-center justify-center flex-shrink-0 size-8 text-primary">
            <BrainIcon />
          </span>
          <span className="text-xl uppercase">Zettel</span>
        </Link>
        <div className="flex items-center">
          {auth.user && <span className="text-sm">{auth.user.email}</span>}
          <Drawer />
        </div>
      </div>
    </header>
  )
}

export default Header
