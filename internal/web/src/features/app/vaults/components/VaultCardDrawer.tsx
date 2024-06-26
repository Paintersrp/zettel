import type { Dispatch, FC, SetStateAction } from "react"
import {
  EditIcon,
  MoreHorizontal,
  NotebookTabs,
  SquareMousePointer,
  Trash,
} from "lucide-react"

import { Vault } from "@/types/app"

import { Button } from "@/components/ui/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import { MenuButton, MenuLink } from "@/components/MenuItems"

interface VaultCardDrawerProps {
  formattedName: string
  vault: Vault
  onDelete: () => void
  onActivate: () => void
  onEdit: () => void
  isActive?: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const VaultCardDrawer: FC<VaultCardDrawerProps> = ({
  formattedName,
  vault,
  onDelete,
  onActivate,
  onEdit,
  isActive = false,
  open,
  setOpen,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="btn-secondary text-primary hover:bg-contrast-hover bg-contrast px-1.5 py-1.5 h-9">
          <MoreHorizontal className="size-5 text-primary" />

          <span className="sr-only">Toggle Settings Menu</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg text-primary">
            Vault ID: {vault.id}
          </DrawerTitle>
          <DrawerDescription className="font-semibold text-base">
            {formattedName}
          </DrawerDescription>
        </DrawerHeader>
        <nav className="grid p-2">
          <DrawerTitle className="px-2 py-2 text-primary">
            Vault Actions
          </DrawerTitle>
          {!isActive && (
            <MenuButton onClick={onActivate} variant="drawer" palette="success">
              Make Active
              <SquareMousePointer className="size-5" />
            </MenuButton>
          )}
          {isActive && (
            <MenuLink to="/app/notes" variant="drawer" palette="success">
              View Notes
              <NotebookTabs className="size-5" />
            </MenuLink>
          )}
          <MenuButton onClick={onEdit} variant="drawer" palette="success">
            Edit
            <EditIcon className="size-5" />
          </MenuButton>

          {!isActive && (
            <MenuButton onClick={onDelete} variant="drawer" palette="error">
              Delete
              <Trash className="size-5" />
            </MenuButton>
          )}
        </nav>
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="outline" className="hover:text-primary">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default VaultCardDrawer
