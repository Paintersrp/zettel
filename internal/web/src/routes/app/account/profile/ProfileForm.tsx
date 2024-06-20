import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { useSendEmailVerificationMutation } from "@/lib/mutations/auth/sendEmailVerification"
import { useUpdateProfileMutation } from "@/lib/mutations/auth/updateProfile"
import {
  UpdateProfileRequest,
  UpdateProfileSchema,
} from "@/lib/validators/auth/updateProfile"
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
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { useAuth } from "@/components/providers/auth"

interface ProfileFormProps {}

const ProfileForm: FC<ProfileFormProps> = () => {
  const { user } = useAuth()

  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: user!,
    mode: "onChange",
  })

  const { mutate: updateProfile } = useUpdateProfileMutation(user!)
  const { mutate: sendVerification } = useSendEmailVerificationMutation(user!)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => updateProfile(data))}
        className="space-y-4 lg:max-w-4xl"
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

          {/* TODO: Needs better disable handling when an email has recently been sent  */}
          {/* TODO: Needs a better way to invalidate after the user has validated the email... event?*/}
          <Button
            size="xs"
            variant="primary"
            className="mt-2"
            onClick={() => sendVerification()}
            disabled={user!.verification_status === "verified"}
          >
            {user!.verification_status === "verified" ? (
              <div className="flex items-center gap-1">
                <CheckIcon className="size-5 text-success" />
                Email Verified
              </div>
            ) : (
              <span>Send Verification Email</span>
            )}
          </Button>
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
