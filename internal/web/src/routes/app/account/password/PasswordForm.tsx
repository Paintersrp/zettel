import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"

import { useChangePasswordMutation } from "@/lib/mutations/change-password"
import useSendPasswordResetMutation from "@/lib/mutations/send-password-reset"
import {
  ChangePasswordRequest,
  ChangePasswordSchema,
} from "@/lib/validators/auth"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { PasswordInput } from "@/components/ui/PasswordInput"
import { useAuth } from "@/components/providers/AuthProvider"

type PasswordFormProps = {}

const PasswordForm: React.FC<PasswordFormProps> = () => {
  // loader assures we have a defined user or redirect, not possible to be undefined
  const { user } = useAuth()
  const [isSent, setIsSent] = useState(false)

  const form = useForm<ChangePasswordRequest>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  })

  const { mutate: updatePassword } = useChangePasswordMutation(
    form.reset,
    user!
  )

  const { mutate: sendPasswordReset } = useSendPasswordResetMutation(
    user!,
    setIsSent
  )

  // TODO: Remove?
  // const sendPasswordReset = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault()
  //   if (!isSent) {
  //     try {
  //       const { status } = await api.post("v1/auth/send-password-reset", {
  //         json: {
  //           user_id: user!.id,
  //           email: user!.email,
  //         },
  //       })
  //       if (status === 200) {
  //         toast.success("Successfully sent password reset email.")
  //         setIsSent(true)
  //       }
  //     } catch (error) {
  //       toast.error(
  //         "Failed to send password reset email. Please try again in a few minutes."
  //       )
  //       throw new Error("Network response was not ok")
  //     }
  //   }
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => updatePassword(data))}
        className="space-y-4 lg:max-w-4xl"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Current Password" {...field} />
              </FormControl>
              <FormDescription>
                The password currently associated with your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-1">
          <FormLabel>Forgot Your Password?</FormLabel>
          <div>
            <Button
              size="xs"
              variant="primary"
              onClick={() => sendPasswordReset()}
              disabled={isSent}
            >
              {isSent ? (
                <div className="flex items-center gap-1">
                  <Check className="size-5 text-success" />
                  Email Sent
                </div>
              ) : (
                <span>Reset Password</span>
              )}
            </Button>
          </div>
          <FormDescription>
            This will send an email to your associated email account. Please
            follow the instructions and included link to complete your password
            reset.
          </FormDescription>
          <FormMessage />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="New Password" {...field} />
              </FormControl>
              <FormDescription>
                Provide the new password for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormDescription>
                Confirm the new password for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button variant="primary" type="submit">
            Change Password
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PasswordForm
