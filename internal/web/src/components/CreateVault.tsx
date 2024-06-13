import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"

import { useCreateVault } from "@/lib/stores/createVault"
import { cn } from "@/lib/utils"
import { VaultFormValues, VaultSchema } from "@/lib/validators/vault"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"

interface CreateVaultProps {}

const CreateVault: React.FC<CreateVaultProps> = () => {
  const { open, setOpen } = useCreateVault()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const form = useForm<VaultFormValues>({
    resolver: zodResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = (data: VaultFormValues) => {
    //createVault(data)
    console.log(data)
  }

  const isLoading = false

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a New Vault</DialogTitle>
          </DialogHeader>
          <VaultForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create a New Vault</DrawerTitle>
        </DrawerHeader>
        <VaultForm
          className="px-4"
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface VaultFormProps {
  form: UseFormReturn<VaultFormValues, any, undefined>
  onSubmit: (data: VaultFormValues) => void
  isLoading: boolean
  className?: string
}

const VaultForm: React.FC<VaultFormProps> = ({
  form,
  onSubmit,
  isLoading,
  className,
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4 w-full", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vault Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter vault name" {...field} />
              </FormControl>
              <FormDescription>
                Choose a unique name for your vault.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Vault"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateVault
