import { Suspense } from "react"

import { Separator } from "@/components/ui/Separator"
import { Loading } from "@/components/Loading"

import KeysForm from "./components/KeysForm"

const Keys = () => {
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
      <Suspense fallback={<Loading />}>
        <KeysForm />
      </Suspense>
    </div>
  )
}

export default Keys
