import { Suspense } from "react"

import { ThemeToggle } from "@/components/ThemeToggle"

import BackButton from "./components/layout/BackButton"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="antialiased h-full text-default bg-background tracking-tight flex flex-col">
      <div className="fixed top-0 z-50 w-full">
        <div className="relative p-2 flex gap-2 justify-between">
          <Suspense fallback={null}>
            <BackButton />
            <ThemeToggle
              classes={{
                button: "bg-background hover:bg-card",
                icon: "text-primary",
              }}
            />
          </Suspense>
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
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
