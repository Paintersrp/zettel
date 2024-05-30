import ProviderButtons from "@/components/ProviderButtons"

export const AuthFormFooter = () => {
  return (
    <>
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-contrast text-primary">
            Or continue with
          </span>
        </div>
      </div>
      <ProviderButtons />
    </>
  )
}

export default AuthFormFooter
