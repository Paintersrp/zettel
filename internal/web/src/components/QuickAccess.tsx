import * as React from "react"
import { useNavigate, useRouter } from "@tanstack/react-router"
import {
  CirclePlus,
  KeySquare,
  NotebookPen,
  NotebookTabs,
  User,
} from "lucide-react"

import { useCreateVault } from "@/lib/stores/createVault"
import { useQuickAccess } from "@/lib/stores/quickAccess"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/Button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/Command"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer"

import { VaultIcon } from "./icons"
import { MenuButton } from "./MenuItems"
import { Separator } from "./ui/Separator"

interface QuickAccessProps {}

const QuickAccess: React.FC<QuickAccessProps> = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const router = useRouter()
  const navigate = useNavigate({ from: router.state.location.pathname })
  const { open, setOpen } = useQuickAccess()
  const { open: createVaultOpen, setOpen: setCreateVaultOpen } =
    useCreateVault()

  const onSelectCreateVault = () => {
    setOpen(false)
    setCreateVaultOpen(!createVaultOpen)
  }

  const onSelectNavigate = (to: string) => {
    setOpen(false)
    navigate({ to })
  }

  const onNoteCreateNavigate = () => {
    onSelectNavigate("/notes/create")
  }

  const onProfileNavigate = () => {
    onSelectNavigate("/account/profile")
  }

  const onSSHNavigate = () => {
    onSelectNavigate("/account/keys")
  }

  const onNotesNavigate = () => {
    onSelectNavigate("/notes")
  }

  const onVaultsNavigate = () => {
    onSelectNavigate("/vaults")
  }

  React.useEffect(() => {
    const openMenuDown = (e: KeyboardEvent) => {
      if (e.key === " " && (e.metaKey || e.altKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    const openCreateVaultDown = (e: KeyboardEvent) => {
      if (e.key === "y" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onSelectCreateVault()
      }
    }

    const openCreateNoteDown = (e: KeyboardEvent) => {
      if (e.key === "m" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onNoteCreateNavigate()
      }
    }

    const openProfileDown = (e: KeyboardEvent) => {
      if (e.key === "p" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onProfileNavigate()
      }
    }

    const openSSHDown = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onSSHNavigate()
      }
    }

    const openNotesDown = (e: KeyboardEvent) => {
      if (e.key === "n" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onNotesNavigate()
      }
    }

    const openVaultsDown = (e: KeyboardEvent) => {
      if (e.key === "v" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onVaultsNavigate()
      }
    }

    document.addEventListener("keydown", openMenuDown)
    document.addEventListener("keydown", openProfileDown)
    document.addEventListener("keydown", openSSHDown)
    document.addEventListener("keydown", openNotesDown)
    document.addEventListener("keydown", openVaultsDown)
    document.addEventListener("keydown", openCreateVaultDown)
    document.addEventListener("keydown", openCreateNoteDown)
    return () => {
      document.removeEventListener("keydown", openMenuDown)
      document.removeEventListener("keydown", openProfileDown)
      document.removeEventListener("keydown", openSSHDown)
      document.removeEventListener("keydown", openNotesDown)
      document.removeEventListener("keydown", openVaultsDown)
      document.removeEventListener("keydown", openCreateVaultDown)
      document.removeEventListener("keydown", openCreateNoteDown)
    }
  }, [])

  if (isDesktop) {
    return (
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={onVaultsNavigate}>
              <span className="size-[18px] mr-2 text-primary">
                <VaultIcon />
              </span>
              <span>Go to Vaults</span>
              <CommandShortcut>⌘V</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={onNotesNavigate}>
              <NotebookTabs className="size-4 mr-2 text-primary" />
              <span>Go to Notes</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={onSelectCreateVault}>
              <CirclePlus className="size-4 mr-2 text-primary" />
              <span>Create Vault</span>
              <CommandShortcut>⌘Y</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={onNoteCreateNavigate}>
              <NotebookPen className="mr-2 h-4 w-4 text-primary" />
              <span>Create Note</span>
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={onProfileNavigate}>
              <User className="mr-2 h-4 w-4 text-primary" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={onSSHNavigate}>
              <KeySquare className="mr-2 h-4 w-4 text-primary" />
              <span>SSH Keys</span>
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    )
  }

  // TODO: Drawer Hotkeys for Commands
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Quick Access</DrawerTitle>
        </DrawerHeader>
        <nav className="grid px-2">
          <DrawerTitle className="px-2 py-2">Actions</DrawerTitle>
          <MenuButton
            variant="drawer"
            palette="muted"
            onClick={onVaultsNavigate}
            className="justify-start"
          >
            <span className="size-[18px] mr-2 text-primary">
              <VaultIcon />
            </span>
            <span>Go to Vaults</span>
          </MenuButton>
          <MenuButton
            variant="drawer"
            palette="muted"
            onClick={onNotesNavigate}
            className="justify-start"
          >
            <NotebookTabs className="size-4 mr-2 text-primary" />
            <span>Go to Notes</span>
          </MenuButton>
          <MenuButton
            variant="drawer"
            palette="muted"
            onClick={onSelectCreateVault}
            className="justify-start"
          >
            <CirclePlus className="size-4 mr-2 text-primary" />
            <span>Create Vault</span>
          </MenuButton>
          <MenuButton
            variant="drawer"
            palette="muted"
            onClick={onNoteCreateNavigate}
            className="justify-start"
          >
            <NotebookPen className="mr-2 h-4 w-4 text-primary" />
            <span>Create Note</span>
          </MenuButton>
          <Separator className="my-4" />
          <DrawerTitle className="px-2 py-2">Actions</DrawerTitle>
          <MenuButton
            variant="drawer"
            palette="muted"
            onClick={onProfileNavigate}
            className="justify-start"
          >
            <User className="mr-2 h-4 w-4 text-primary" />
            <span>Profile</span>
          </MenuButton>
          <MenuButton
            variant="drawer"
            palette="muted"
            onClick={onSSHNavigate}
            className="justify-start"
          >
            <KeySquare className="mr-2 h-4 w-4 text-primary" />
            <span>SSH Keys</span>
          </MenuButton>
        </nav>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default QuickAccess
