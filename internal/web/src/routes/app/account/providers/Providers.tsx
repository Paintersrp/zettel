import { Separator } from "@/components/ui/Separator"

import ProvidersForm from "./ProvidersForm"

interface ProvidersProps {}

const Providers: React.FC<ProvidersProps> = () => {
  return (
    <div className="space-y-3 sm:space-y-6">
      <div>
        <h3 className="text-lg font-medium">Social Login Providers</h3>
        <p className="text-sm text-muted">
          Update the social providers associated with your account.
        </p>
      </div>
      <Separator />
      <ProvidersForm />
    </div>
  )
}

export default Providers