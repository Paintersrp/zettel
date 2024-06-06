import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"

const ProviderSchema = z.object({})
type ProviderRequest = z.infer<typeof ProviderSchema>

interface ProvidersFormProps {}

const ProvidersForm: React.FC<ProvidersFormProps> = () => {
  const form = useForm<ProviderRequest>({
    resolver: zodResolver(ProviderSchema),
  })

  function onSubmit(data: ProviderRequest) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        Currently a work-in-progress.
        <div className="flex justify-end">
          <Button variant="primary" type="submit">
            Add Provider
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProvidersForm
