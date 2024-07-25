"use client"

import { valibotResolver } from "@hookform/resolvers/valibot"
import { useForm } from "react-hook-form"

import { useLogin } from "@/lib/auth/client/useLogin"
import { LoginRequest, LoginSchema } from "@/lib/auth/validate/login"
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

// 2.37kb 7/04/24

const LoginForm = () => {
  const form = useForm<LoginRequest>({
    resolver: valibotResolver(LoginSchema),
  })

  const loginMutation = useLogin()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => loginMutation.mutate(data))}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
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
export default LoginForm
