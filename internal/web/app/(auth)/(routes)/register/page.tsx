import Link from "next/link"

import RegisterForm from "./components/RegisterForm"

const Register = () => {
  return (
    <div className="w-full max-w-sm">
      <RegisterForm />
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="relative font-medium text-primary group">
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
