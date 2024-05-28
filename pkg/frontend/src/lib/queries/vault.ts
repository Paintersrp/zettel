import { QueryClient } from "@tanstack/react-query"

import { VaultWithNotes } from "@/types/app"
import axios from "@/lib/axios"

const fetchVault = async (id: string): Promise<VaultWithNotes> => {
  const { data } = await axios.get(`v1/api/vaults/${id}`)
  return data
}

const vaultQuery = (id: string) => ({
  queryFn: async () => fetchVault(id),
  queryKey: ["vault", id],
  retry: false,
  refetchOnWindowFocus: false,
})

const vaultLoader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    console.log(params.id, "params")
    const query = vaultQuery(params.id)

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    )
  }

export { fetchVault, vaultQuery, vaultLoader }
