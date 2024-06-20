import { useCallback, useEffect, type FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useCreateVaultMutation } from "@/lib/mutations/createVault"
import { useUpdateVaultMutation } from "@/lib/mutations/updateVault"
import { useEditVault } from "@/lib/stores/editVault"
import { formatVaultName } from "@/lib/utils"
import { VaultFormValues, VaultSchema } from "@/lib/validators/vault"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

interface EditVaultProps {}

const EditVault: FC<EditVaultProps> = () => {
  const { selectedVault, open, setOpen } = useEditVault()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const updateVaultMutation = useUpdateVaultMutation()

  const form = useForm<VaultFormValues>({
    defaultValues: selectedVault ?? {},
    resolver: zodResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = (data: VaultFormValues) => {
    console.log("here")
    if (selectedVault) {
      updateVaultMutation.mutate(
        { ...data, vaultId: selectedVault.id },
        { onSuccess: () => setOpen(false) }
      )
    }
  }

  // const onSubmit = useCallback(
  //   (data: VaultFormValues) => {
  //     console.log("here")
  //     if (selectedVault) {
  //       updateVaultMutation.mutate(
  //         { ...data, vaultId: selectedVault.id },
  //         { onSuccess: () => setOpen(false) }
  //       )
  //     }
  //   },
  //   [updateVaultMutation, selectedVault]
  // )

  const isLoading = false

  useEffect(() => {
    if (selectedVault) form.reset({ ...selectedVault })
  }, [selectedVault])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Editing Vault:{" "}
              {selectedVault ? formatVaultName(selectedVault.name) : ""}
            </DialogTitle>
          </DialogHeader>
          <VaultForm
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isEdit={true}
          />
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

export default EditVault
