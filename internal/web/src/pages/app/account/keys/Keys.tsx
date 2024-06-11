import { createRoute, redirect } from "@tanstack/react-router"

import { Separator } from "@/components/ui/Separator"
import { useAuth } from "@/components/providers/AuthProvider"
import { accountLayout } from "@/pages/app/account/Account"

import KeysForm from "./KeysForm"

export const keysRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/keys",
  component: () => <Keys />,
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

interface KeysProps {}

const Keys: React.FC<KeysProps> = () => {
  const { user } = useAuth()
  if (user?.username === "") {
    console.log("TRUE...")
  }
  return (
    <div className="space-y-3 sm:space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Keys (SSH)</h3>
        <p className="text-sm text-muted">
          Update your account SSH keys, used to securely connect with the CLI
          Tool.
        </p>
      </div>
      <Separator />
      <KeysForm />
    </div>
  )
}

export default Keys
