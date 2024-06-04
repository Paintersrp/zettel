import { rootRoute } from "@/root"
import { createRoute } from "@tanstack/react-router"

import BaseLayout from "@/layouts/base/Base"

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
})

interface HomeRouteProps {}

const Home: React.FC<HomeRouteProps> = () => {
  return (
    <BaseLayout>
      <div className="min-h-full w-full">
        <div className="relative flex flex-col justify-center items-center w-full h-full px-8">
          <h1 className="text-3xl md:text-5xl mb-2">Welcome to Zettel</h1>
          <img className="md:w-2/3" src="/bud.gif"></img>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Home
