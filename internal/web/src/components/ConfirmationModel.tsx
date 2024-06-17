import { type FC } from "react"

import { useMounted } from "@/hooks/useMounted"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"

interface ConfirmationModalProps {
  onConfirm: () => void
  isLoading: boolean
  open: boolean
  onClose: () => void
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  onConfirm,
  isLoading,
  open,
  onClose,
}) => {
  const mounted = useMounted()

  if (!mounted) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 justify-end md:justify-end">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ConfirmationModal }
