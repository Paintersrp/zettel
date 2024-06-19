import { FC, useCallback, useEffect, useState } from "react"
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

import { NoteWithDetails } from "@/types/app"
import api from "@/lib/api"
import { useCreateVault } from "@/lib/stores/createVault"
import { useQuickAccess } from "@/lib/stores/quickAccess"
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

import { VaultIcon } from "./icons"
import { Loading } from "./Loading"

type SearchQueryResults = NoteWithDetails[] | undefined
interface QuickAccessProps {}

const QuickAccess: FC<QuickAccessProps> = () => {
  const router = useRouter()
  const pathname = router.state.location.pathname
  const navigate = useNavigate({ from: pathname })

  const [input, setInput] = useState<string>("")
  const { open, setOpen } = useQuickAccess()
  const { open: createVaultOpen, setOpen: setCreateVaultOpen } =
    useCreateVault()

  const request = debounce(async () => {
    refetch()
  }, 300)

  const debounceRequest = useCallback(() => {
    request()
  }, [])

  const onSelect = useCallback((note: NoteWithDetails) => {
    setInput("")
    setOpen(false)
    navigate({
      to: "/notes/$id",
      params: { id: note.id.toString() },
      state: { note },
    })
  }, [])

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

  const onOpenChange = (open: boolean) => {
    setInput("")
    setOpen(open)
  }

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

  useEffect(() => {
    setInput("")
  }, [pathname])

  useEffect(() => {
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

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
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
                              <span>
                                {format(
                                  new Date(note.created_at),
                                  "MMM d, yyyy"
                                )}
                              </span>
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
