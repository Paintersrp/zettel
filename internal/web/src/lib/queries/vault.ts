import { useQuery } from "@tanstack/react-query"

import { VaultAndNotes, VaultResponse } from "@/types/app"
import api from "@/lib/api"
import { NOTES_PER_PAGE } from "@/lib/const"

const useVaultQuery = (id: number, page: number) =>
  useQuery(vaultQueryOptions(id, page))

const vaultQueryOptions = (id: number, page: number) => ({
  queryFn: async () => vaultQuery(id, page),
  queryKey: ["vault", id, page],
  retry: false,
  refetchOnWindowFocus: false,
})

const vaultQuery = async (id: number, page: number): Promise<VaultResponse> => {
  const data: VaultAndNotes = await api
    .get(`v1/api/vaults/${id}?page=${page}&limit=${NOTES_PER_PAGE}`)
    .json()
  return { data, nextPage: 2, prevPage: 1 }
}

export { useVaultQuery, vaultQueryOptions, vaultQuery }
