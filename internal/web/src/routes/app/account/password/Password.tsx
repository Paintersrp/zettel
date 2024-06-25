import type { FC } from "react"

import { Separator } from "@/components/ui/Separator"

import PasswordForm from "./PasswordForm"

interface PasswordProps {}

const Password: FC<PasswordProps> = () => {
  return (
    <div className="space-y-3 sm:space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted">
          Update the password for your account.
        </p>
      </div>
      <Separator />
      <PasswordForm />
    </div>
  )
}

export default Password
