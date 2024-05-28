import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import axios from "@/lib/axios"
import { RegisterRequest, RegisterSchema } from "@/lib/validators/auth"
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

const RegisterForm = () => {
  const navigate = useNavigate()
  const client = useQueryClient()
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  const { mutate: register } = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const { data: res, status } = await axios.post("v1/auth/register", data)

      if (status !== 200) {
        throw new Error("Network response was not ok")
      }

      return res.token
    },
    onSuccess: (token: string) => {
      Cookies.set("jwt", token, { expires: 60, path: "/" })

      toast.success("Register successful", {
        description: `You have successfully registered an account.`,
      })

      client.invalidateQueries({ queryKey: ["user"] })
      navigate("/")
    },
    onError: (error: any) => {
      // TODO:
      console.log(error)
    },
  })

  const submitRegister: SubmitHandler<RegisterRequest> = (data) => {
    return register(data)
  }

  return (
    <div className="w-full max-w-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitRegister)}
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
          <button type="submit" className="btn-primary w-full mt-4">
            Submit
          </button>
          <AuthFormFooter />
        </form>
      </Form>
      <p className="mt-6 text-sm text-center text-muted">
        Already have an account?{" "}
        <Link to="/login" className="relative font-medium text-primary group">
          <span>Login here</span>
          <span className="absolute bottom-0 left-0 w-0 group-hover:w-full ease-out duration-300 h-0.5 bg-primary-hover"></span>
        </Link>
      </p>
      <p className="px-8 mt-1 text-sm text-center text-muted">
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

export default RegisterForm
