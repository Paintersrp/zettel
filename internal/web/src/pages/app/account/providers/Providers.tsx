import { createRoute, redirect } from "@tanstack/react-router"

import { Separator } from "@/components/ui/Separator"
import { accountLayout } from "@/pages/app/account/Account"

import ProvidersForm from "./ProvidersForm"

export const providersRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/providers",
  component: () => <Providers />,
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

interface ProvidersProps {}

const Providers: React.FC<ProvidersProps> = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Social Login Providers</h3>
        <p className="text-sm text-muted">
          Update the social providers associated with your account.
        </p>
      </div>
      <Separator />
      <ProvidersForm />
    </div>
  )
}

export default Providers
