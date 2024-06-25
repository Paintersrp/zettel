import { useCallback, useEffect, useState, type FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useRouter } from "@tanstack/react-router"
import { format } from "date-fns"
import { debounce } from "lodash"
import {
  CirclePlus,
  KeySquare,
  LinkIcon,
  NotebookPen,
  NotebookTabs,
  TagsIcon,
  User,
} from "lucide-react"

import { api } from "@/lib/api"
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
import { useKeyboardShortcuts } from "@/features/app/layout/hooks/useKeyboardShortcuts"
import { useQuickAccess } from "@/features/app/layout/stores/quickAccess"
import { useVaultCreateModal } from "@/features/app/vaults/stores/vaultCreateModal"

type SearchQueryResults = NoteWithDetails[] | undefined
interface QuickAccessProps {}

// TODO: Tidy

export const QuickAccess: FC<QuickAccessProps> = () => {
  const router = useRouter()
  const pathname = router.state.location.pathname
  const navigate = useNavigate({ from: pathname })

  const [input, setInput] = useState<string>("")
  const quickAccess = useQuickAccess()
  const vaultCreateModal = useVaultCreateModal()

  const request = debounce(async () => {
    refetch()
  }, 300)

  // TODO: Test Callback
  const debounceRequest = useCallback(() => {
    request()
  }, [request])

  // TODO: Test Callback
  const onSelect = useCallback(
    (note: NoteWithDetails) => {
      setInput("")
      quickAccess.setOpen(false)
      navigate({
        to: "/notes/$id",
        params: { id: note.id.toString() },
        state: { note },
      })
    },
    [navigate, quickAccess]
  )

  // TODO: Separate
  const {
    isFetching,
    data: queryResults,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const data: SearchQueryResults = await api
        .get(`v1/api/notes/search?q=${input}`)
        .json()
      return data
    },
    queryKey: ["search-query"],
    enabled: false,
  })

  const onOpenChange = useCallback(
    (open: boolean) => {
      setInput("")
      quickAccess.setOpen(open)
    },
    [quickAccess, setInput]
  )

  const onSelectCreateVault = () => {
    quickAccess.setOpen(false)
    vaultCreateModal.setOpen(!vaultCreateModal.open)
  }

  const onNoteCreateNavigate = () => {
    navigate({ to: "/notes/create" })
  }

  const onProfileNavigate = () => {
    navigate({ to: "/account/profile" })
  }

  const onSSHNavigate = () => {
    navigate({ to: "/account/keys" })
  }

  const onNotesNavigate = () => {
    navigate({ to: "/notes" })
  }

  const onVaultsNavigate = () => {
    navigate({ to: "/vaults" })
  }

  useKeyboardShortcuts({
    onNoteCreateNavigate,
    onProfileNavigate,
    onSSHNavigate,
    onNotesNavigate,
    onVaultsNavigate,
    onSelectCreateVault,
    quickAccess,
  })

  useEffect(() => {
    setInput("")
    quickAccess.setOpen(false)
  }, [pathname])

  return (
    <CommandDialog open={quickAccess.open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Type a command or search..."
        isLoading={isFetching}
        onValueChange={(text) => {
          setInput(text)
          debounceRequest()
        }}
        value={input}
      />

      <CommandList>
        {input.length > 0 && (
          <>
            {isFetching ? (
              <CommandEmpty>
                <Loading />
              </CommandEmpty>
            ) : (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {queryResults && (
              <CommandGroup heading="Matching Notes">
                {queryResults.map((note: NoteWithDetails) => {
                  const contentWordCount = note.content.split(" ").length
                  const wordCount = `${contentWordCount} Word${contentWordCount > 1 ? "s" : ""}`
                  const formattedDate = format(
                    new Date(note.created_at),
                    "MMM d, yyyy"
                  )

                  return (
                    <CommandItem
                      key={note.id}
                      value={note.title}
                      onSelect={() => onSelect(note)}
                      className="w-full p-2 sine"
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-default">
                              {note.title}
                            </h3>
                            <div className="text-sm text-muted">
                              <span>{formattedDate}</span>
                              <span className="mx-1">|</span>
                              <span>{wordCount}</span>
                            </div>
                          </div>
                          <div className="flex flex-col justify-end items-center gap-0 text-muted">
                            <span className="flex items-center text-base gap-1">
                              <TagsIcon className="size-5 text-primary" />
                              {note.tags?.length ?? 0}
                            </span>
                            <span className="flex items-center text-base gap-1">
                              <LinkIcon className="size-5 text-primary" />
                              {note.linkedNotes?.length ?? 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  )
                })}
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
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default QuickAccess
