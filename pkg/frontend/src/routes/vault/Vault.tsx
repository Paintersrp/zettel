import { FC } from "react"
import BaseLayout from "@/layouts/base/Base"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { vaultQuery } from "@/lib/queries/vault"
import { formatVaultName } from "@/lib/utils"
import { Loading } from "@/components/Loading"

import NoteInfo from "./NoteInfo"
import NotePreview from "./NotePreview"

interface VaultRouteProps {}

const VaultRoute: FC<VaultRouteProps> = () => {
  const { id } = useParams()

  if (!id) {
    return <div>No ID Given.</div>
  }

  const { data: vault, isLoading, error } = useQuery(vaultQuery(id))

  if (isLoading) {
    return (
      <BaseLayout>
        <Loading />
      </BaseLayout>
    )
  }

  if (error) {
    console.error("Error fetching notes:", error)
    return <div>Error loading notes.</div>
  }

  if (!vault) {
    return <div>Vault not found.</div>
  }

  return (
    <BaseLayout>
      <div className="pb-4 w-full">
        <h1 className="text-3xl font-bold pb-4 pt-2">
          Vault: {formatVaultName(vault.name)}
        </h1>
        <div className="flex flex-col gap-4 w-full">
          {vault.notes?.map((note) => (
            <div
              key={note.id}
              className="bg-contrast rounded shadow-md overflow-hidden flex flex-col"
            >
              <div className="p-4 flex flex-col md:flex-row md:gap-4 md:justify-between flex-grow">
                <NoteInfo note={note} />
                <NotePreview note={note} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default VaultRoute
