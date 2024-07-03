import { useCallback, useEffect, useState } from "react"
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
import { Loading } from "@/components/Loading"
import { useGetNotesSearch } from "@/features/app/layout/api/getNotesSearch"
import { QuickAccessItem } from "@/features/app/layout/components/QuickAccessItem"

// TODO: Search Input should be part of the store, such that we can keep the search in history
// TODO: More quick access commands?

export const SearchPanel = () => {
  const [input, setInput] = useState<string>("")

  const router = useRouter()
  const pathname = router.state.location.pathname
  const navigate = useNavigate({ from: pathname })
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

  // TODO: Test Callback
  const onSelect = useCallback(
    (note: NoteWithDetails) => {
      // TODO: Close Sidepanel?
      navigate({
        to: "/app/notes/$id",
        params: { id: note.id.toString() },
        state: { note },
      })
    },
    [navigate]
  )

  useEffect(() => {
    setInput("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Command className="bg-accent">
      <CommandInput
        containerClass="bg-accent"
        placeholder="Type a command or search..."
        onValueChange={onValueChange}
        value={input}
      />
      <CommandList className="min-h-[calc(100vh-8.5rem)] border-b bg-accent">
        {input.length > 0 ? (
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
            {/* TODO: Quick Access Item Skeletons */}
            Start by searcing for a note...
          </CommandEmpty>
        )}
      </CommandList>
    </Command>
  )
}

export default SearchPanel
