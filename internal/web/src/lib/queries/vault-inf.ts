import { VaultResponse } from "@/types/app"
import axios from "@/lib/axios"
import { NOTES_PER_PAGE } from "@/lib/const"

const fetchVaultInf = async (
  id: string,
  page: number
): Promise<VaultResponse> => {
  const { data } = await axios.get(
    `v1/api/vaults/${id}?page=${page}&limit=${NOTES_PER_PAGE}`
  )

  const nextPage = data.has_more ? page + 1 : null
  const prevPage = page !== 0 ? page - 1 : null

  return { data, nextPage, prevPage }
}

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

export { fetchVaultInf, vaultInfQuery }
