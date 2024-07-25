"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  ProviderRequest,
  ProviderSchema,
} from "@/lib/account/validate/socialProviders"
import { Button } from "@/components/ui/button/Button"
import { Form } from "@/components/ui/form/Form"

export const ProvidersForm = () => {
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
