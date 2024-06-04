import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"

const keysFormSchema = z.object({})

type KeysFormValues = z.infer<typeof keysFormSchema>

const defaultValues: Partial<KeysFormValues> = {}

export function KeysForm() {
  const form = useForm<KeysFormValues>({
    resolver: zodResolver(keysFormSchema),
    defaultValues,
  })

  function onSubmit(data: KeysFormValues) {
    console.log("data", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>Currently a work-in-progress.</div>
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  )
}
