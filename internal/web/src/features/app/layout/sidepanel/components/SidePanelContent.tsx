import { useCallback, useEffect, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useIntersection } from "@/hooks/useIntersection"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { Editor } from "@/components/Editor"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"
import { useGetNotesInfQuery } from "@/features/app/notes/api/getNotesInf"
import { NoteListMobile } from "@/features/app/notes/components/NoteListMobile"
import { useVaultCreate } from "@/features/app/vaults/api/vaultCreate"
import { useVaultUpdate } from "@/features/app/vaults/api/vaultUpdate"
import { VaultForm } from "@/features/app/vaults/components/VaultForm"
import { useVaultCreateModal } from "@/features/app/vaults/stores/vaultCreateModal"
import { useVaultUpdateModal } from "@/features/app/vaults/stores/vaultUpdateModal"
import {
  VaultSchema,
  type VaultFormValues,
} from "@/features/app/vaults/validators"
import { useAuth } from "@/features/auth/providers"

import { SidePanelSearch } from "./SidePanelSearch"

export type SidePanelContentType =
  | "preview"
  | "notes"
  | "search"
  | "scratchpad"
  | "vault"
  | "vault-edit"
  | null

export const SidePanelContent = ({
  type,
  contentKey,
  props,
}: {
  type: SidePanelContentType
  contentKey: string | null
  props: Record<string, any>
}) => {
  switch (type) {
    case "preview":
      return <PreviewPanel noteId={contentKey} {...props} />
    case "notes":
      return <NotesPanel {...props} />
    case "search":
      return <SearchPanel {...props} />
    case "scratchpad":
      return <ScratchPadPanel {...props} />
    case "vault":
      return <VaultFormPanel {...props} />
    case "vault-edit":
      return <VaultEditFormPanel {...props} />
    default:
      return null
  }
}

const PreviewPanel = ({
  noteId,
  fullScreen,
}: {
  noteId: string | null
  fullScreen?: boolean
}) => {
  return (
    <div>
      Preview of Note {noteId} (Full Screen: {fullScreen ? "Yes" : "No"})
    </div>
  )
}

const NotesPanel = () => {
  const { user } = useAuth()

  if (!user?.active_vault) {
    return null
  }

  const { id: vaultId } = user.active_vault

  const notesInfQuery = useGetNotesInfQuery({
    id: vaultId,
    filter: "all",
    max: 10,
  })

  const handleIntersection = useCallback(() => {
    if (!notesInfQuery.isFetching) {
      notesInfQuery.fetchNextPage()
    }
  }, [notesInfQuery])

  const intersection = useIntersection({
    root: null,
    threshold: 0.2,
    onIntersect: handleIntersection,
  })

  const notes = useMemo(
    () => notesInfQuery.data?.pages.flatMap((page) => page.data.notes) ?? [],
    [notesInfQuery.data?.pages]
  )

  return (
    <div className="flex flex-col w-full py-2 sm:py-0">
      <ScrollArea className="h-[800px] py-2 mb-4 md:py-0 md:mb-0">
        <NoteListMobile
          query={notesInfQuery}
          notes={notes}
          ref={intersection.ref}
        />
      </ScrollArea>
    </div>
  )
}

const SearchPanel = () => {
  return <SidePanelSearch />
}

const ScratchPadPanel = () => {
  return (
    <div className="flex w-full h-[800px]">
      <Editor />
    </div>
  )
}

const VaultEditFormPanel = () => {
  const updateModal = useVaultUpdateModal()
  const updateVaultMutation = useVaultUpdate()
  const { openPanel } = useSidePanel()

  const form = useForm<VaultFormValues>({
    defaultValues: updateModal.selectedVault ?? {},
    resolver: zodResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = useCallback(
    (data: VaultFormValues) => {
      if (updateModal.selectedVault) {
        updateVaultMutation.mutate(
          { ...data, vaultId: updateModal.selectedVault.id },
          {
            onSuccess: () => openPanel("search", "global"),
          }
        )
      }
    },
    [updateVaultMutation, updateModal, openPanel]
  )

  useEffect(() => {
    if (updateModal.selectedVault) form.reset({ ...updateModal.selectedVault })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateModal.selectedVault])

  return (
    <VaultForm
      className="p-4"
      form={form}
      onSubmit={onSubmit}
      isLoading={updateVaultMutation.isPending}
      isInDrawer={true}
      isEdit={true}
    />
  )
}

const VaultFormPanel = () => {
  const modal = useVaultCreateModal()
  const createMutation = useVaultCreate()
  const { openPanel } = useSidePanel()

  const form = useForm<VaultFormValues>({
    resolver: zodResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = useCallback(
    (data: VaultFormValues) => {
      createMutation.mutate(data, {
        onSuccess: () => openPanel("search", "global"),
      })
    },
    [createMutation, modal]
  )

  return (
    <VaultForm
      className="p-4"
      form={form}
      onSubmit={onSubmit}
      isLoading={createMutation.isPending}
      isInDrawer={true}
      isEdit={true}
    />
  )
}
