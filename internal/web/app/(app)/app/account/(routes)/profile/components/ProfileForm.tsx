"use client"

import { valibotResolver } from "@hookform/resolvers/valibot"
import { useForm } from "react-hook-form"

import { useUpdateProfile } from "@/lib/account/client/useUpdateProfile"
import {
  UpdateProfileRequest,
  UpdateProfileSchema,
} from "@/lib/validators/update-profile"
import { Button } from "@/components/ui/button/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/Form"
import { Input } from "@/components/ui/form/Input"
import { Textarea } from "@/components/ui/form/Textarea"
import { useAuth } from "@/components/auth/provider"

import ResetPasswordButton from "./ResetPasswordButton"

export const ProfileForm = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const form = useForm<UpdateProfileRequest>({
    resolver: valibotResolver(UpdateProfileSchema),
    defaultValues: user,
    mode: "onChange",
  })

  const updateProfileMutation = useUpdateProfile({ user })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          updateProfileMutation.mutate(data)
        )}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                Your unique username will be used to identify you on the
                platform.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  The email address where you'd like to receive notifications
                  and updates.
                </FormDescription>
              </FormItem>
            )}
          />

          <ResetPasswordButton />
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a brief description about yourself, your interests, or
                your background. This will be displayed on your public profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferred_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm
