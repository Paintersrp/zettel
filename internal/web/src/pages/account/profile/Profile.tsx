import { createRoute, redirect } from "@tanstack/react-router"

import { Separator } from "@/components/ui/Separator"
import { useAuth } from "@/components/providers/AuthProvider"
import { accountLayout } from "@/layouts/account/Account"

import ProfileForm from "./ProfileForm"

export const profileRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/profile",
  component: () => <Profile />,
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

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  // loader assures we have a defined user or redirect, not possible to be undefined
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user!} />
    </div>
  )
}

export default Profile
