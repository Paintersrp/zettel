import { createRoute, redirect } from "@tanstack/react-router"

import { Separator } from "@/components/ui/Separator"
import { accountLayout } from "@/pages/app/account/Account"

import PasswordForm from "./PasswordForm"

export const passwordRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/password",
  component: () => <Password />,
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

interface PasswordProps {}

const Password: React.FC<PasswordProps> = () => {
  return (
    <div className="space-y-3 sm:space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted">
          Update the password for your account.
        </p>
      </div>
      <Separator />
      <PasswordForm />
    </div>
  )
}

export default Password
