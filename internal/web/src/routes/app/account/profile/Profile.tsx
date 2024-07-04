import { Separator } from "@/components/ui/Separator"
import { ProfileForm } from "@/features/app/account/profile/components/ProfileForm"

// 4.10kb 7/04/24

const Profile = () => {
  return (
    <div className="space-y-3 sm:space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium">User Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}

export default Profile
