import { User, Vault } from "@/types/app"
import BrainIcon from "@/components/icons/Brain"

import AuthModal from "./AuthModal"
import Drawer from "./Drawer"

interface HeaderProps {
  user: User
  vaults?: Vault[]
}

const Header: React.FC<HeaderProps> = ({ user, vaults }) => {
  return (
    <header className="flex items-center w-full h-16 select-none border-b mb-2">
      <div className="container px-4 sm:px-8 relative flex flex-wrap items-center justify-between w-full mx-auto font-medium md:items-center md:h-16 md:justify-between">
        <a
          href="/"
          className="flex items-center w-1/4 space-x-2 font-extrabold md:py-0"
        >
          <span className="flex items-center justify-center flex-shrink-0 size-8 text-primary">
            <BrainIcon />
          </span>
          <span className="text-xl uppercase">Zettel</span>
        </a>
        <div className="flex items-center">
          {user.username === "" ? (
            <AuthModal />
          ) : (
            <>
              <span className="text-sm">{user.email}</span>
            </>
          )}
          <Drawer user={user} vaults={vaults} />
        </div>
      </div>
    </header>
  )
}

export default Header
