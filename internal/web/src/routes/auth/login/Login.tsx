import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
import { useForm } from "react-hook-form"

import { useLoginMutation } from "@/lib/mutations/auth/login"
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
import { PasswordInput } from "@/components/ui/PasswordInput"
import AuthFormFooter from "@/routes/auth/AuthFormFooter"

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  })

  const { mutate: login } = useLoginMutation()

  return (
    <div className="w-full max-w-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => login(data))}
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
