import { type FC } from "react"
import { StarIcon } from "lucide-react"

import type { Vault } from "@/types/app"
import { formatVaultName } from "@/utils/string"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

import { VaultCardMenu } from "./VaultCardMenu"

interface VaultCardProps {
  vault: Vault
  isActive?: boolean
}

// TODO: Mobile Styles

export const VaultCard: FC<VaultCardProps> = ({ vault, isActive = false }) => {
  // const noteCount = `${vault.note_count} Note${vault.note_count > 1 ? "s" : ""}`
  const formattedVaultName = formatVaultName(vault.name)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              {isActive && <StarIcon className="text-primary size-5" />}
              <CardTitle>{formattedVaultName}</CardTitle>
            </div>
          </div>
          <VaultCardMenu
            formattedName={formattedVaultName}
            vault={vault}
            isActive={isActive}
          />
        </div>
      </CardHeader>
      <CardContent>
        {vault.description && (
          <CardDescription className="font-medium text-sm">
            {vault.description}
          </CardDescription>
        )}
        {/* <div className="flex items-center gap-1"> */}
        {/*   <NotepadTextDashedIcon className="text-primary size-4" /> */}
        {/*   <span className="text-primary">{noteCount}</span> */}
        {/* </div> */}
      </CardContent>
    </Card>
  )
}

export default VaultCard
