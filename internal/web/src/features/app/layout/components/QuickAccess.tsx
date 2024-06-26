import { useCallback, useEffect, useState } from "react"
import { useNavigate, useRouter } from "@tanstack/react-router"
import {
  CirclePlus,
  KeySquare,
  LogOut,
  NotebookPen,
  NotebookTabs,
  User,
} from "lucide-react"

import { debounce } from "@/lib/debounce"
import { NoteWithDetails } from "@/types/app"

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
import { VaultIcon } from "@/components/icons"
import { Loading } from "@/components/Loading"
import { useGetNotesSearch } from "@/features/app/layout/api/getNotesSearch"
import { useKeyboardShortcuts } from "@/features/app/layout/hooks/useKeyboardShortcuts"
import { useQuickAccess } from "@/features/app/layout/stores/quickAccess"
import { useVaultCreateModal } from "@/features/app/vaults/stores/vaultCreateModal"

import { QuickAccessItem } from "./QuickAccessItem"

export const QuickAccess = () => {
  const [input, setInput] = useState<string>("")

  const router = useRouter()
  const pathname = router.state.location.pathname
  const navigate = useNavigate({ from: pathname })

  const quickAccess = useQuickAccess()
  const vaultCreateModal = useVaultCreateModal()
  const searchQuery = useGetNotesSearch({ input })

  const debouncedRefetch = useCallback(
    debounce(() => {
      searchQuery.refetch()
    }, 500),
    [searchQuery.refetch]
  )

  const onValueChange = (text: string) => {
    setInput(text)
    debouncedRefetch()
  }

  const onOpenChange = useCallback(
    (open: boolean) => {
      setInput("")
      quickAccess.setOpen(open)
    },
    [quickAccess, setInput]
  )

  // TODO: Test Callback
  const onSelect = useCallback(
    (note: NoteWithDetails) => {
      setInput("")
      quickAccess.setOpen(false)
      navigate({
        to: "/app/notes/$id",
        params: { id: note.id.toString() },
        state: { note },
      })
    },
    [navigate, quickAccess]
  )

  const onSelectCreateVault = () => {
    quickAccess.setOpen(false)
    vaultCreateModal.setOpen(!vaultCreateModal.open)
  }

  const onNoteCreateNavigate = () => {
    navigate({ to: "/app/notes/create" })
  }

  const onNotesNavigate = () => {
    navigate({ to: "/app/notes" })
  }

  const onVaultsNavigate = () => {
    navigate({ to: "/app/vaults" })
  }

  const onProfileNavigate = () => {
    navigate({ to: "/app/account/profile" })
  }

  const onSSHNavigate = () => {
    navigate({ to: "/app/account/keys" })
  }

  const onLogoutNavigate = () => {
    window.location.href = "http://localhost:6474/v1/auth/logout"
  }

  useKeyboardShortcuts({
    onNoteCreateNavigate,
    onNotesNavigate,
    onVaultsNavigate,
    onSelectCreateVault,
    onProfileNavigate,
    onSSHNavigate,
    quickAccess,
  })

  useEffect(() => {
    setInput("")
    quickAccess.setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <CommandDialog open={quickAccess.open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Type a command or search..."
        isLoading={searchQuery.isFetching}
        onValueChange={onValueChange}
        value={input}
      />
      <CommandList>
        {input.length > 0 && (
          <>
            {searchQuery.isFetching ? (
              <CommandEmpty>
                <Loading />
              </CommandEmpty>
            ) : (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {searchQuery.data && (
              <CommandGroup heading="Matching Notes">
                {searchQuery.data.map((note) => (
                  <CommandItem
                    key={note.id}
                    value={note.title}
                    onSelect={() => onSelect(note)}
                    className="w-full p-2 sine"
                  >
                    <QuickAccessItem note={note} />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        )}
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
          <CommandItem onSelect={onLogoutNavigate}>
            <LogOut className="mr-2 h-4 w-4 text-primary" />
            <span>Logout</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default QuickAccess
