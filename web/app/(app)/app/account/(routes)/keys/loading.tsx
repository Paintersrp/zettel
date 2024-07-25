import { Separator } from "@/components/ui/Separator"
import { Loading } from "@/components/Loading"

const KeysLoading = () => {
  return (
    <div className="space-y-3 sm:space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium">Security Keys (SSH)</h3>
        <p className="text-sm text-muted-foreground">
          Update your account SSH keys, used to securely connect with the CLI
          Tool.
        </p>
      </div>
      <Separator />

      {/* TODO: Profile Skeleton */}
      <Loading />
    </div>
  )
}

export default KeysLoading
