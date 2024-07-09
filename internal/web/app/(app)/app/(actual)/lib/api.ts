import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { NoteWithDetails, Vault, VaultAndNotes } from "@/types/app"
import { fetch } from "@/lib/fetch"

export const useNotes = (vaultId: number) => {
  const queryClient = useQueryClient()

  const notesQuery = useQuery<NoteWithDetails[]>({
    queryKey: ["notes", vaultId],
    queryFn: async () => {
      const response: VaultAndNotes = await fetch(
        `/v1/api/vaults/${vaultId}?page=0&limit=0&filter=all`
      ).then((res) => res.json())

      return response.notes
    },
  })

  const createNoteMutation = useMutation({
    mutationFn: (newNote: Partial<NoteWithDetails>) =>
      fetch(`/v1/api/notes`, {
        method: "POST",
        body: JSON.stringify(newNote),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", vaultId] })
    },
  })

  const updateNoteMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: number
      updates: Partial<NoteWithDetails>
    }) =>
      fetch(`/v1/api/notes/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", vaultId] })
    },
  })

  const deleteNoteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/v1/api/notes/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", vaultId] })
    },
  })

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    isFetching: notesQuery.isFetching,
    error: notesQuery.error,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
  }
}

export const useVaults = () => {
  const queryClient = useQueryClient()

  const vaultsQuery = useQuery<Vault[]>({
    queryKey: ["vaults"],
    queryFn: async () => {
      return fetch("/v1/api/vaults").then((res) => res.json())
    },
  })

  const createVaultMutation = useMutation({
    mutationFn: (newVault: Partial<Vault>) =>
      fetch("/v1/api/vaults", {
        method: "POST",
        body: JSON.stringify(newVault),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] })
    },
  })

  const updateVaultMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Vault> }) =>
      fetch(`/v1/api/vaults/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] })
    },
  })

  const deleteVaultMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/v1/api/vaults/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] })
    },
  })

  return {
    vaults: vaultsQuery.data || [],
    isLoading: vaultsQuery.isLoading,
    error: vaultsQuery.error,
    createVault: createVaultMutation.mutate,
    updateVault: updateVaultMutation.mutate,
    deleteVault: deleteVaultMutation.mutate,
  }
}
