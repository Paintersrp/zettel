import { Separator } from "@/components/ui/Separator"
import { useAuth } from "@/components/providers/AuthProvider"

import KeysForm from "./KeysForm"

interface KeysProps {}

const Keys: React.FC<KeysProps> = () => {
  const { user } = useAuth()
  if (user?.username === "") {
    console.log("TRUE...")
  }
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
