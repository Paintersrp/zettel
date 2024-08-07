"use client"

import { useCallback, useEffect } from "react"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { useForm } from "react-hook-form"

import { useUpdateVault } from "@/lib/vault/client/useUpdateVault"
import { VaultFormValues, VaultSchema } from "@/lib/vault/validate"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { formatVaultName } from "@/utils/string"
import { Button } from "@/components/ui/button/Button"
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

import { useVaultUpdateModal } from "./useVaultUpdateModal"
import { VaultForm } from "./VaultForm"

export const VaultUpdateModal = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const updateModal = useVaultUpdateModal()
  const updateVaultMutation = useUpdateVault()

  const form = useForm<VaultFormValues>({
    defaultValues: updateModal.selectedVault ?? {},
    resolver: valibotResolver(VaultSchema),
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
