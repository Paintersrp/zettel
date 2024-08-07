import { Separator } from "@/components/ui/Separator"
import { Loading } from "@/components/Loading"

const ProvidersLoading = () => {
  return (
    <div className="space-y-3 sm:space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium">Social Login Providers</h3>
        <p className="text-sm text-muted-foreground">
          Update the social providers associated with your account.
        </p>
      </div>
      <Separator />

      {/* TODO: Profile Skeleton */}
      <Loading />
    </div>
  )
}

export default ProvidersLoading
