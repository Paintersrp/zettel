"use client"

import { useSearchParams } from "next/navigation"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { PasswordInput } from "@/components/ui/PasswordInput"
import SocialProviderButtons from "@/app/(auth)/components/shared/SocialProviderButtons"
import { useLogin } from "@/app/(auth)/lib/useLogin"
import { LoginRequest, LoginSchema } from "@/app/(auth)/lib/validators"

// 2.37kb 7/04/24

const LoginForm = () => {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const form = useForm<LoginRequest>({
    resolver: valibotResolver(LoginSchema),
  })

  const loginMutation = useLogin({ redirect })

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
