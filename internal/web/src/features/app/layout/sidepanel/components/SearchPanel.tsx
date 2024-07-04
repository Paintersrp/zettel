import { useCallback, useEffect } from "react"
import { useNavigate, useRouter } from "@tanstack/react-router"

import { debounce } from "@/lib/debounce"
import { NoteWithDetails } from "@/types/app"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command"
import { DevCode } from "@/components/ui/DevCode"
import { Loading } from "@/components/Loading"
import { useGetNotesSearch } from "@/features/app/layout/api/getNotesSearch"
import { QuickAccessItem } from "@/features/app/layout/components/QuickAccessItem"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"

export const SearchPanel = () => {
  const router = useRouter()
  const pathname = router.state.location.pathname
  const navigate = useNavigate({ from: pathname })
  const { currentState, setSearchInput } = useSidePanel()
  const searchQuery = useGetNotesSearch({
    input: currentState.searchInput || "",
  })

  const debouncedRefetch = useCallback(
    debounce(() => {
      searchQuery.refetch()
    }, 500),
    [searchQuery.refetch]
  )

  const onValueChange = (text: string) => {
    setSearchInput(text)
    debouncedRefetch()
  }

  const onSelect = useCallback(
    (note: NoteWithDetails) => {
      navigate({
        to: "/app/notes/$id",
        params: { id: note.id.toString() },
        state: { note },
      })
    },
    [navigate]
  )

  useEffect(() => {
    // Clear search input only when opening a new search panel
    if (currentState.contentType === "search" && !currentState.searchInput) {
      setSearchInput("")
    }
  }, [currentState.contentType, currentState.searchInput, setSearchInput])

  return (
    <Command className="bg-accent">
      <DevCode data={currentState} />
      <CommandInput
        containerClass="bg-accent"
        placeholder="Type a command or search..."
        onValueChange={onValueChange}
        value={currentState.searchInput || ""}
      />
      <CommandList className="min-h-[calc(100vh-8.5rem)] border-b bg-accent">
        {currentState.searchInput && currentState.searchInput.length > 0 ? (
          <>
            {searchQuery.isFetching && (
              <CommandEmpty>
                <Loading />
              </CommandEmpty>
            )}
            {searchQuery.data && (
              <CommandGroup heading="Matching Notes">
                {searchQuery.data.map((note) => (
                  <CommandItem
                    key={note.id}
                    value={note.title}
                    onSelect={() => onSelect(note)}
                    className="w-full p-2 sine data-[selected=true]:bg-card"
                  >
                    <QuickAccessItem note={note} />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        ) : (
          <CommandEmpty className="font-medium py-2">
            Start by searching for a note...
          </CommandEmpty>
        )}
      </CommandList>
    </Command>
  )
}

export default SearchPanel
