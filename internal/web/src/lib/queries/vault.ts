import { useQuery } from "@tanstack/react-query"

import { VaultResponse } from "@/types/app"
import axios from "@/lib/axios"
import { NOTES_PER_PAGE } from "@/lib/const"

const fetchVault = async (id: number, page: number): Promise<VaultResponse> => {
  const { data } = await axios.get(
    `v1/api/vaults/${id}?page=${page}&limit=${NOTES_PER_PAGE}`
  )
  return { data, nextPage: 2, prevPage: 1 }
}

const vaultQuery = (id: number, page: number) => ({
  queryFn: async () => fetchVault(id, page),
  queryKey: ["vault", id, page],
  retry: false,
  refetchOnWindowFocus: false,
})

const useVaultQuery = (id: number, page: number) =>
  useQuery(vaultQuery(id, page))

export { fetchVault, vaultQuery, useVaultQuery }
