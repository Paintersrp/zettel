import { useUserStore } from "@/lib/stores/user"
import { Loading } from "@/components/Loading"

import BackToTop from "./BackToTop"
import Footer from "./Footer"
import Header from "./Header"

interface BaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { user } = useUserStore()

  return (
    <div className="dark min-h-screen antialiased text-default bg-page tracking-tight flex flex-col">
      {!user ? (
        <Loading />
      ) : (
        <>
          <Header user={user!} vaults={user!.vaults} />

          <main className="container px-4 sm:px-8 flex-grow flex">
            {!user ? <Loading /> : children}
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </div>
  )
}

export default BaseLayout
