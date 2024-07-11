import { type FC } from "react"

import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useMounted } from "@/hooks/useMounted"
import { Button } from "@/components/ui/button/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer"

interface ConfirmModalProps {
  onConfirm: () => void
  isLoading: boolean
  open: boolean
  onClose: () => void
  title?: string
  description?: string
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  onConfirm,
  isLoading,
  open,
  onClose,
  title = "Are you sure you want to delete this?",
  description = "This action cannot be undone.",
}) => {
  const mounted = useMounted()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!mounted) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 justify-end md:justify-end">
            <DialogClose asChild>
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  onConfirm()
                }}
                type="button"
                autoFocus
              >
                Confirm
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation()
                onConfirm()
              }}
              type="button"
              autoFocus
            >
              Confirm
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              type="button"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { ConfirmModal }
