import { useUserStore } from "@/lib/stores/user"

import BackToTop from "./BackToTop"
import Footer from "./Footer"
import Header from "./Header"

interface BaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { user } = useUserStore()

  if (!user) {
    return <div>Loading... here </div>
  }

  return (
    <div className="dark min-h-screen antialiased text-default bg-page tracking-tight flex flex-col">
      <Header user={user!} vaults={user!.vaults} />
      <main className="container px-4 sm:px-8 flex-grow flex">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default BaseLayout
