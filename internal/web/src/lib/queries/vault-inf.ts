import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { VaultAndNotes, VaultResponse } from "@/types/app"
import api from "@/lib/api"
import { NOTES_PER_PAGE } from "@/lib/const"

const useVaultInfQuery = (initialData: VaultResponse, id: number) =>
  useSuspenseInfiniteQuery({
    queryKey: ["notes-inf", id],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      vaultInfQuery(id, pageParam),
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 1,
    getNextPageParam: (lastPage: VaultResponse) => {
      if (lastPage.nextPage) {
        return lastPage.nextPage
      }
    },
  })

const vaultInfQuery = async (
  id: number,
  page: number
): Promise<VaultResponse> => {
  try {
    const data: VaultAndNotes = await api
      .get(`v1/api/vaults/${id}?page=${page}&limit=${NOTES_PER_PAGE}`)
      .json()
    const nextPage = data.has_more ? page + 1 : null
    const prevPage = page !== 0 ? page - 1 : null
    return { data, nextPage, prevPage }
  } catch (error) {
    toast.error("Error fetching vault note data", {
      description: `Network response was not ok. Please try again in a few minutes.`,
    })
    throw new Error("Failed to fetch vault notes")
  }
}

export { useVaultInfQuery, vaultInfQuery }
