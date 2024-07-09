import { Suspense } from "react"

import { Separator } from "@/components/ui/Separator"
import { Loading } from "@/components/Loading"

import ProvidersForm from "./components/ProvidersForm"

const Providers = () => {
  return (
    <div className="space-y-3 sm:space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium">Social Login Providers</h3>
        <p className="text-sm text-muted-foreground">
          Update the social providers associated with your account.
        </p>
      </div>
      <Separator />
      <Suspense fallback={<Loading />}>
        <ProvidersForm />
      </Suspense>
    </div>
  )
}

export default Providers
