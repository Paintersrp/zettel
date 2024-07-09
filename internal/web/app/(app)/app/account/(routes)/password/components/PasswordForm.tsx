"use client"

import { useState } from "react"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  ChangePasswordRequest,
  ChangePasswordSchema,
} from "@/lib/validators/change-password"
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
import { useAuth } from "@/components/auth/provider"

import { useChangePassword } from "../../../lib/changePassword"
import { useSendPasswordReset } from "../../../lib/sendPasswordReset"

export const PasswordForm = () => {
  const [isSent, setIsSent] = useState(false)
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const form = useForm<ChangePasswordRequest>({
    resolver: valibotResolver(ChangePasswordSchema),
    mode: "onChange",
  })

  const changePasswordMutation = useChangePassword({
    user,
    reset: form.reset,
  })

  const sendResetMutation = useSendPasswordReset({
    user,
    setIsSent,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (data.password === data.confirmPassword) {
            changePasswordMutation.mutate(data)
          } else {
            if (data.password === data.currentPassword) {
              toast.error(
                "New password cannot be the same as the current password",
                {
                  description: "Please try again.",
                }
              )
            } else {
              toast.error("Passwords do not match", {
                description: "Please try again.",
              })
            }
          }
        })}
        className="space-y-4"
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
              onClick={() => sendResetMutation.mutate()}
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
