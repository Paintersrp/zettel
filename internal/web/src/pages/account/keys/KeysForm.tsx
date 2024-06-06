import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"

const KeySchema = z.object({})

type KeyRequest = z.infer<typeof KeySchema>

interface KeysFormProps {}

const KeysForm: React.FC<KeysFormProps> = () => {
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
