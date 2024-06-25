import { useCallback, useEffect, type FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useVaultUpdateMutation } from "@/lib/mutations/vaults/vaultUpdate"
import { useVaultUpdateModal } from "@/lib/stores/vaultUpdateModal"
import { formatVaultName } from "@/lib/utils"
import { VaultSchema, type VaultFormValues } from "@/lib/validators/vault"
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

import { VaultForm } from "./VaultForm"

interface VaultUpdateModalProps {}

export const VaultUpdateModal: FC<VaultUpdateModalProps> = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const updateModal = useVaultUpdateModal()
  const updateVaultMutation = useVaultUpdateMutation()

  const form = useForm<VaultFormValues>({
    defaultValues: updateModal.selectedVault ?? {},
    resolver: zodResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = useCallback(
    (data: VaultFormValues) => {
      if (updateModal.selectedVault) {
        updateVaultMutation.mutate(
          { ...data, vaultId: updateModal.selectedVault.id },
          { onSuccess: () => updateModal.setOpen(false) }
        )
      }
    },
    [updateVaultMutation, updateModal]
  )

  const formattedVaultName = updateModal.selectedVault
    ? formatVaultName(updateModal.selectedVault.name)
    : ""

  useEffect(() => {
    if (updateModal.selectedVault) form.reset({ ...updateModal.selectedVault })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateModal.selectedVault])

  if (isDesktop) {
    return (
      <Dialog open={updateModal.open} onOpenChange={updateModal.setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editing Vault: {formattedVaultName}</DialogTitle>
          </DialogHeader>
          <VaultForm
            form={form}
            onSubmit={onSubmit}
            isLoading={updateVaultMutation.isPending}
            isEdit={true}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={updateModal.open} onOpenChange={updateModal.setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editing Vault: {formattedVaultName}</DrawerTitle>
        </DrawerHeader>
        <VaultForm
          className="px-4"
          form={form}
          onSubmit={onSubmit}
          isLoading={updateVaultMutation.isPending}
          isInDrawer={true}
          isEdit={true}
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

export default VaultUpdateModal
