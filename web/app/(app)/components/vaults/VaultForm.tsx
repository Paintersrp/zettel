import type { FC } from "react"
import type { UseFormReturn } from "react-hook-form"

import { VaultFormValues } from "@/lib/vault/validate"
import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/Form"
import { Input } from "@/components/ui/form/Input"
import { Textarea } from "@/components/ui/form/Textarea"

interface VaultFormProps {
  form: UseFormReturn<VaultFormValues, unknown, undefined>
  onSubmit: (data: VaultFormValues) => void
  isLoading: boolean
  className?: string
  isInDrawer?: boolean
  isEdit?: boolean
}

export const VaultForm: FC<VaultFormProps> = ({
  form,
  onSubmit,
  isLoading,
  className,
  isInDrawer = false,
  isEdit = false,
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vault Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter vault description" {...field} />
              </FormControl>
              <FormDescription>
                Write a short description about your vault.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isEdit && (
          <FormField
            control={form.control}
            name="makeActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Make this new active your active vault?</FormLabel>
                  <FormDescription>
                    You can always change your active vault later.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end">
          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={isLoading}
            className={isInDrawer ? "w-full text-sm" : ""}
          >
            {isEdit ? (
              <>{isLoading ? "Updating..." : "Update Vault"}</>
            ) : (
              <>{isLoading ? "Creating..." : "Create Vault"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default VaultForm
