import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { createRoute, Link } from "@tanstack/react-router"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { loginMutation } from "@/lib/mutations/login"
import { LoginRequest, LoginSchema } from "@/lib/validators/auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { AuthFormFooter } from "@/components/AuthFormFooter"
import { PasswordInput } from "@/components/PasswordInput"
import { authLayout } from "@/layouts/auth/Auth"

export const loginRoute = createRoute({
  getParentRoute: () => authLayout,
  path: "login",
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: () => <Login />,
})

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const search = loginRoute.useSearch()
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  })

  const { mutate: login } = useMutation(loginMutation(search.redirect))

  const onSubmit: SubmitHandler<LoginRequest> = (data) => {
    return login(data)
  }

  return (
    <div className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          <button type="submit" className="btn-primary w-full mt-4">
            Submit
          </button>
          <AuthFormFooter />
        </form>
      </Form>
      <p className="mt-6 text-sm text-center text-muted">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="relative font-medium text-primary group"
        >
          <span>Register here</span>
          <span className="absolute bottom-0 left-0 w-0 group-hover:w-full ease-out duration-300 h-0.5 bg-primary-hover"></span>
        </Link>
      </p>
    </div>
  )
}
export default Login
