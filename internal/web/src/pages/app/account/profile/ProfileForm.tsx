import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useProfileMutation } from "@/lib/mutations/profile"
import useSendEmailVerificationMutation from "@/lib/mutations/send-email-verification"
import { ProfileRequest, ProfileSchema } from "@/lib/validators/profile"
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
import { CheckIcon } from "@/components/icons"
import { useAuth } from "@/components/providers/AuthProvider"

type ProfileFormProps = {}

const ProfileForm: React.FC<ProfileFormProps> = () => {
  // loader assures we have a defined user or redirect, not possible to be undefined here
  const { user } = useAuth()

  const form = useForm<ProfileRequest>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: user!,
    mode: "onChange",
  })

  const { mutate: updateProfile } = useProfileMutation(user!)
  const { mutate: sendVerification } = useSendEmailVerificationMutation(user!)

  // TODO: Remove?
  // const sendVerification = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault()
  //   try {
  //     const { status } = await api.post("v1/auth/send-verification", {
  //       json: {
  //         user_id: user!.id,
  //         email: user!.email,
  //       },
  //     })
  //     if (status === 200) {
  //       toast.success("Successfully sent verification email.")
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user:", error)
  //     throw new Error("Network response was not ok")
  //   }
  // }

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
                <span className="size-5 text-success">
                  <CheckIcon />
                </span>
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
