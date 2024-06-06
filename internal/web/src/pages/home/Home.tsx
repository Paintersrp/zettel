import { createRoute, redirect } from "@tanstack/react-router"

import { baseLayout } from "@/layouts/base/Base"

export const homeRoute = createRoute({
  getParentRoute: () => baseLayout,
  path: "/",
  component: () => <Home />,
  beforeLoad: ({ context }) => {
    if (context.user) {
      if (context.user.active_vault) {
        throw redirect({
          to: `/vault`,
        })
      } else {
        throw redirect({
          to: "/vault/new",
        })
      }
    }
  },
})

interface HomeRouteProps {}

const Home: React.FC<HomeRouteProps> = () => {
  return (
    <div className="min-h-full w-full">
      <div className="relative flex flex-col justify-center items-center w-full h-full px-8">
        <h1 className="text-3xl md:text-5xl mb-2">Welcome to Zettel</h1>
        <img className="md:w-2/3" src="/bud.gif"></img>
      </div>
    </div>
  )
}

export default Home
