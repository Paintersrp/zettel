import { Suspense } from "react"
import Link from "next/link"

import LoginForm from "./components/LoginForm"

const Login = () => {
  return (
    <div className="w-full max-w-sm">
      <Suspense>
        <LoginForm />
      </Suspense>
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
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
