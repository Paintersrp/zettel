import { createRoute, redirect } from "@tanstack/react-router"

import { appLayout } from "@/pages/app/App"

export const createVaultRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/vault/create",
  component: () => <CreateVault />,
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

interface CreateVaultProps {}

const CreateVault: React.FC<CreateVaultProps> = () => {
  return (
    <div className="min-h-full w-full">
      <div className="relative flex flex-col justify-center items-center w-full h-full px-8">
        <h1 className="text-3xl md:text-5xl mb-2">Welcome to Zettel</h1>
        <img className="md:w-2/3" src="/bud.gif"></img>
      </div>
    </div>
  )
}

export default CreateVault
