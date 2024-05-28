import AuthLayout from "@/layouts/auth/Auth"

import LoginForm from "./LoginForm"

interface LoginRouteProps {}

const LoginRoute: React.FC<LoginRouteProps> = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginRoute
