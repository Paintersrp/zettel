import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/api"
import type { NoteWithDetails, Vault, VaultAndNotes } from "@/types/app"

export const useNotes = (vaultId: number) => {
  const queryClient = useQueryClient()

  const notesQuery = useQuery<NoteWithDetails[]>({
    queryKey: ["notes", vaultId],
    queryFn: async () => {
      const response: VaultAndNotes = await api
        .get(`v1/api/vaults/${vaultId}?page=0&limit=0&filter=all`)
        .json()

      return response.notes
    },
  })

  const createNoteMutation = useMutation({
    mutationFn: (newNote: Partial<NoteWithDetails>) =>
      api.post(`v1/api/notes`, { json: newNote }).json(),
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
    }) => api.patch(`v1/api/notes/${id}`, { json: updates }).json(),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", vaultId] })
    },
  })

  const deleteNoteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`v1/api/notes/${id}`).json(),
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
      const response = await api.get("v1/api/vaults")
      return response.json()
    },
  })

  const createVaultMutation = useMutation({
    mutationFn: (newVault: Partial<Vault>) =>
      api.post("v1/api/vaults", { json: newVault }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] })
    },
  })

  const updateVaultMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Vault> }) =>
      api.patch(`v1/api/vaults/${id}`, { json: updates }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] })
    },
  })

  const deleteVaultMutation = useMutation({
    mutationFn: (id: number) => api.delete(`v1/api/vaults/${id}`).json(),
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
