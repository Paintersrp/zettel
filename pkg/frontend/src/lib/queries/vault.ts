import { VaultAndNotes } from "@/types/app"
import axios from "@/lib/axios"

const fetchVault = async (
  id: string,
  page: number,
  limit: number
): Promise<{
  data: VaultAndNotes
  nextPage: number | null
  prevPage: number | null
}> => {
  const { data } = await axios.get(
    `v1/api/vaults/${id}?page=${page}&limit=${limit}`
  )
  return { data, nextPage: 2, prevPage: 1 }
}

const vaultQuery = (id: string, page: number, limit: number) => ({
  queryFn: async () => fetchVault(id, page, limit),
  queryKey: ["vault", id, page, limit],
  retry: false,
  refetchOnWindowFocus: false,
})

export { fetchVault, vaultQuery }
