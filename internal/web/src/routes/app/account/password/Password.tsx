import { Separator } from "@/components/ui/Separator"
import { PasswordForm } from "@/features/app/account/password/components/PasswordForm"

// 4.11kb 7/04/24

const Password = () => {
  return (
    <div className="space-y-3 sm:space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          Update the password for your account.
        </p>
      </div>
      <Separator />
      <PasswordForm />
    </div>
  )
}

export default Password
