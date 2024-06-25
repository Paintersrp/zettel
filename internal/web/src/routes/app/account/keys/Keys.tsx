import { Separator } from "@/components/ui/Separator"
import { KeysForm } from "@/features/app/account/keys/components/KeysForm"

const Keys = () => {
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
