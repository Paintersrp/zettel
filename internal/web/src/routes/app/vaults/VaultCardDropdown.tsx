import { Dispatch, FC, SetStateAction } from "react"
import {
  EditIcon,
  MoreHorizontal,
  NotebookTabs,
  SquareMousePointer,
  Trash,
} from "lucide-react"

import { Vault } from "@/types/app"
import { formatVaultName } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { MenuButton, MenuLink } from "@/components/MenuItems"

interface VaultCardDropdownProps {
  vault: Vault
  onDelete: () => void
  onActivate: () => void
  onEdit: () => void
  isActive?: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const VaultCardDropdown: FC<VaultCardDropdownProps> = ({
  vault,
  onDelete,
  onActivate,
  onEdit,
  isActive = false,
  open,
  setOpen,
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="iconSm" className="hover:text-primary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[160px] max-w-[200px]"
      >
        <DropdownMenuLabel className="flex flex-col gap-0.5 text-primary font-normal">
          <span>Vault ID: {vault.id}</span>
          <span className="font-normal text-default truncate">
            {formatVaultName(vault.name)}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal text-muted">
          <span>Vault Actions</span>
        </DropdownMenuLabel>
        {!isActive && (
          <DropdownMenuItem className="group px-0 py-0">
            <MenuButton onClick={onActivate} palette="success">
              Make Active
              <SquareMousePointer className="size-5" />
            </MenuButton>
          </DropdownMenuItem>
        )}
        {isActive && (
          <DropdownMenuItem className="group px-0 py-0">
            <MenuLink to="/notes" palette="success">
              View Notes
              <NotebookTabs className="size-5" />
            </MenuLink>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="group px-0 py-0">
          <MenuButton onClick={onEdit} palette="success">
            Edit
            <EditIcon className="size-5" />
          </MenuButton>
        </DropdownMenuItem>
        {!isActive && (
          <DropdownMenuItem className="group px-0 py-0">
            <MenuButton onClick={onDelete} palette="error">
              Delete
              <Trash className="size-5" />
            </MenuButton>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default VaultCardDropdown
