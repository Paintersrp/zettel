import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { useVaultCreateMutation } from "@/features/app/vaults/api/vaultCreate"
import { useVaultCreateModal } from "@/features/app/vaults/stores/vaultCreateModal"
import { VaultFormValues, VaultSchema } from "@/features/app/vaults/validators"

import { VaultForm } from "./VaultForm"

export const VaultCreateModal = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const modal = useVaultCreateModal()
  const createMutation = useVaultCreateMutation()

  const form = useForm<VaultFormValues>({
    resolver: zodResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = useCallback(
    (data: VaultFormValues) => {
      createMutation.mutate(data, { onSuccess: () => modal.setOpen(false) })
    },
    [createMutation, modal]
  )

  if (isDesktop) {
    return (
      <Dialog open={modal.open} onOpenChange={modal.setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a New Vault</DialogTitle>
          </DialogHeader>
          <VaultForm
            form={form}
            onSubmit={onSubmit}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={modal.open} onOpenChange={modal.setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create a New Vault</DrawerTitle>
        </DrawerHeader>
        <VaultForm
          className="px-4"
          form={form}
          onSubmit={onSubmit}
          isLoading={createMutation.isPending}
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

export default VaultCreateModal
