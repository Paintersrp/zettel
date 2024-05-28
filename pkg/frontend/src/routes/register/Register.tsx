import AuthLayout from "@/layouts/auth/Auth"

import RegisterForm from "./RegisterForm"

interface RegisterRouteProps {}

const RegisterRoute: React.FC<RegisterRouteProps> = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterRoute
