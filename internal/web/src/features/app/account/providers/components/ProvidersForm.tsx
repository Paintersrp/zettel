import type { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import {
  ProviderSchema,
  type ProviderRequest,
} from "@/features/app/account/providers/validators/provider"

interface ProvidersFormProps {}

export const ProvidersForm: FC<ProvidersFormProps> = () => {
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
