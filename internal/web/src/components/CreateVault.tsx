import { useCallback, type FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useCreateVaultMutation } from "@/lib/mutations/vaults/createVault"
import { useCreateVault } from "@/lib/stores/createVault"
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
import { VaultForm } from "@/components/VaultForm"

interface CreateVaultProps {}

const CreateVault: FC<CreateVaultProps> = () => {
  const { open, setOpen } = useCreateVault()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const createVaultMutation = useCreateVaultMutation()

  const form = useForm<VaultFormValues>({
    resolver: zodResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = useCallback(
    (data: VaultFormValues) => {
      createVaultMutation.mutate(data, { onSuccess: () => setOpen(false) })
    },
    [createVaultMutation, setOpen]
  )

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
          isInDrawer={true}
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

export default CreateVault
