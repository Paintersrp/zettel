"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { KeyRequest, KeySchema } from "@/lib/account/validate/keys"
import { Button } from "@/components/ui/button/Button"
import { Form } from "@/components/ui/form/Form"

export const KeysForm = () => {
  const form = useForm<KeyRequest>({
    resolver: zodResolver(KeySchema),
  })

  function onSubmit(data: KeyRequest) {
    console.log("data", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>Currently a work-in-progress.</div>
        <div className="flex justify-end">
          <Button variant="outline" type="submit">
            Add Key
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default KeysForm
