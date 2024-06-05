import { VaultResponse } from "@/types/app"
import axios from "@/lib/axios"
import { NOTES_PER_PAGE } from "@/lib/const"

const fetchVault = async (id: string, page: number): Promise<VaultResponse> => {
  const { data } = await axios.get(
    `v1/api/vaults/${id}?page=${page}&limit=${NOTES_PER_PAGE}`
  )
  return { data, nextPage: 2, prevPage: 1 }
}

const vaultQuery = (id: string, page: number) => ({
  queryFn: async () => fetchVault(id, page),
  queryKey: ["vault", id, page],
  retry: false,
  refetchOnWindowFocus: false,
})

export { fetchVault, vaultQuery }
