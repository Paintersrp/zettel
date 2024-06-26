import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
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
import { useRegister } from "@/features/auth/api/register"
import { SocialProviderButtons } from "@/features/auth/components/SocialProviderButtons"
import {
  RegisterRequest,
  RegisterSchema,
} from "@/features/auth/validators/register"

import { registerRoute } from "."

const Register = () => {
  const { redirect } = registerRoute.useSearch()
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
  })

  const registerMutation = useRegister({ redirect })

  return (
    <div className="w-full max-w-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => registerMutation.mutate(data))}
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
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="relative font-medium text-primary group"
        >
          <span>Login here</span>
          <span className="absolute bottom-0 left-0 w-0 group-hover:w-full ease-out duration-300 h-0.5 bg-primary/90"></span>
        </Link>
      </p>
      <p className="px-8 mt-1 text-sm text-center text-muted-foreground">
        By continuing, you agree to our{" "}
        <a
          className="underline underline-offset-4 text-primary hover:text-primary-hover"
          href="/terms"
        >
          Terms{" "}
        </a>
        and{" "}
        <a
          className="underline underline-offset-4 text-primary hover:text-primary-hover"
          href="/privacy"
        >
          Policy
        </a>
        .
      </p>
    </div>
  )
}

export default Register
