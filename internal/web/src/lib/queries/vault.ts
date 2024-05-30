import { VaultAndNotes } from "@/types/app"
import axios from "@/lib/axios"

const MAX_PAGE_LIMIT = 10

type VaultResponse = {
  data: VaultAndNotes
  nextPage: number | null
  prevPage: number | null
}

const fetchVault = async (id: string, page: number): Promise<VaultResponse> => {
  const { data } = await axios.get(
    `v1/api/vaults/${id}?page=${page}&limit=${MAX_PAGE_LIMIT}`
  )
  return { data, nextPage: 2, prevPage: 1 }
}

const fetchVaultInf = async (
  id: string,
  page: number
): Promise<VaultResponse> => {
  const { data } = await axios.get(
    `v1/api/vaults/${id}?page=${page}&limit=${MAX_PAGE_LIMIT}`
  )

  const nextPage = data.has_more ? page + 1 : null
  const prevPage = page !== 0 ? page - 1 : null

  return { data, nextPage, prevPage }
}

const vaultQuery = (id: string, page: number) => ({
  queryFn: async () => fetchVault(id, page),
  queryKey: ["vault", id, page],
  retry: false,
  refetchOnWindowFocus: false,
})

const vaultInfQuery = (initialData: VaultResponse, id: string) => ({
  queryKey: ["notes-inf", id],
  queryFn: async ({ pageParam }: { pageParam: number }) =>
    fetchVaultInf(id, pageParam),
  initialData: { pages: [initialData], pageParams: [1] },
  initialPageParam: 1,
  getNextPageParam: (lastPage: VaultResponse) => {
    if (lastPage.nextPage) {
      return lastPage.nextPage
    }
  },
})

export { fetchVault, vaultQuery, fetchVaultInf, vaultInfQuery }
