import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import axios from "@/lib/axios"
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

const LoginForm = () => {
  const navigate = useNavigate()
  const client = useQueryClient()
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate: login } = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const { data: res, status } = await axios.post("v1/auth/login", data)

      if (status !== 200) {
        throw new Error("Network response was not ok")
      }

      return res.token
    },
    onSuccess: (token: string) => {
      Cookies.set("jwt", token, { expires: 60, path: "/" })

      toast.success("Login successful", {
        description: `You have been successfully logged in`,
      })

      client.invalidateQueries({ queryKey: ["user"] })
      navigate("/")
    },
    onError: (error: any) => {
      // TODO:
      console.log(error)
    },
  })

  const submitLogin: SubmitHandler<LoginRequest> = (data) => {
    return login(data)
  }

  return (
    <div className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitLogin)} className="space-y-2">
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

export default LoginForm
