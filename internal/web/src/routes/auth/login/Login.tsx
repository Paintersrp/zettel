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
import { useLogin } from "@/features/auth/api/login"
import { SocialProviderButtons } from "@/features/auth/components/SocialProviderButtons"
import { LoginRequest, LoginSchema } from "@/features/auth/validators/login"

import { loginRoute } from "."

// 2.37kb 7/04/24

const Login = () => {
  const { redirect } = loginRoute.useSearch()
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  })

  const loginMutation = useLogin({ redirect })

  return (
    <div className="w-full max-w-sm">
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
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="relative font-medium text-primary group"
        >
          <span>Register here</span>
          <span className="absolute bottom-0 left-0 w-0 group-hover:w-full ease-out duration-300 h-0.5 bg-primary/90"></span>
        </Link>
      </p>
    </div>
  )
}
export default Login
