import { Separator } from "@/components/ui/Separator"
import { Loading } from "@/components/Loading"

const PasswordLoading = () => {
  return (
    <div className="space-y-3 sm:space-y-6 max-w-3xl bg-accent">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          Update the password for your account.
        </p>
      </div>
      <Separator />

      {/* TODO: Profile Skeleton */}
      <Loading />
    </div>
  )
}

export default PasswordLoading
