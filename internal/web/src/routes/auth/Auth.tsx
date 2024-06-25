import { Outlet } from "@tanstack/react-router"

import { ThemeToggle } from "@/components/ThemeToggle"
import { BackButton } from "@/features/auth/components/BackButton"

interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  return (
    <div className="antialiased h-full text-default bg-page tracking-tight flex flex-col">
      <div className="fixed top-0 z-50 w-full">
        <div className="relative p-2 flex gap-2 justify-between">
          <BackButton />
          <ThemeToggle
            classes={{
              button: "hover:bg-contrast",
              icon: "text-primary",
            }}
          />
        </div>
      </div>
      <main className="flex-grow flex">
        <div className="relative flex-shrink-0 hidden w-1/3 overflow-hidden bg-cover lg:block">
          <div className="absolute inset-0 z-20 w-full h-full opacity-70 bg-gradient-to-t from-black" />
          <img
            src="https://images.unsplash.com/photo-1612585763928-e64fdc2a3d38?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="z-10 object-cover w-full h-full"
            alt="Background"
          />
        </div>

        <div className="min-h-full w-full">
          <div className="relative flex flex-col justify-center items-center w-full h-full px-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
