import type { FC } from "react"

import { Separator } from "@/components/ui/Separator"

import ProfileForm from "./ProfileForm"

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  return (
    <div className="space-y-3 sm:space-y-6">
      <div>
        <h3 className="text-lg font-medium">User Profile</h3>
        <p className="text-sm text-muted">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}

export default Profile
