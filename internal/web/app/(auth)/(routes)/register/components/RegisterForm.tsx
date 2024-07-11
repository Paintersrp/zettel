"use client"

import { valibotResolver } from "@hookform/resolvers/valibot"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useRegister } from "@/lib/auth/client/useRegister"
import { RegisterRequest, RegisterSchema } from "@/lib/auth/validate"
import { Button } from "@/components/ui/button/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/Form"
import { Input } from "@/components/ui/form/Input"
import { PasswordInput } from "@/components/ui/form/PasswordInput"
import { SocialProviderButtons } from "@/app/(auth)/components/socialProviders/SocialProviderButtons"

// 3.55kb 2024-07-04

const RegisterForm = () => {
  const form = useForm<RegisterRequest>({
    resolver: valibotResolver(RegisterSchema),
  })

  const registerMutation = useRegister()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (data.password === data.confirmPassword) {
            registerMutation.mutate(data)
          } else {
            toast.error("Passwords do not match", {
              description: "Please try again.",
            })
          }
        })}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
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
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-2">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>

        <SocialProviderButtons />
      </form>
    </Form>
  )
}

export default RegisterForm
