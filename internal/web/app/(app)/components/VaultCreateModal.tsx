"use client"

import { useCallback } from "react"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { useForm } from "react-hook-form"

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
import VaultForm from "@/components/VaultForm"

import { usePostVault } from "../lib/usePostVault"
import { useVaultCreateModal } from "../state/vaultCreateModal"

export const VaultCreateModal = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const modal = useVaultCreateModal()
  const postVaultMutation = usePostVault()

  const form = useForm<VaultFormValues>({
    resolver: valibotResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = useCallback(
    (data: VaultFormValues) => {
      postVaultMutation.mutate(data, {
        onSuccess: () => {
          form.reset({
            name: "",
            description: "",
            makeActive: false,
          })
          modal.setOpen(false)
        },
      })
    },
    [postVaultMutation.mutate, modal]
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
            isLoading={postVaultMutation.isPending}
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
          isLoading={postVaultMutation.isPending}
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
