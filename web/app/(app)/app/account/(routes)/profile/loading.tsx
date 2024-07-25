import { Separator } from "@/components/ui/Separator"
import { Loading } from "@/components/Loading"

const ProfileLoading = () => {
  return (
    <div className="space-y-3 sm:space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium">User Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />

      {/* TODO: Profile Skeleton */}
      <Loading />
    </div>
  )
}

export default ProfileLoading
