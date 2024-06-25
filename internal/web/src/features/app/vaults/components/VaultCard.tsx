import { type FC } from "react"
import { NotepadTextDashedIcon, StarIcon } from "lucide-react"

import { formatVaultName } from "@/lib/utils"
import type { Vault } from "@/types/app"

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
  const noteCount = `${vault.note_count} Note${vault.note_count > 1 ? "s" : ""}`
  const formattedVaultName = formatVaultName(vault.name)

  return (
    <Card className="transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              {isActive && <StarIcon className="text-primary size-5" />}
              <CardTitle>{formattedVaultName}</CardTitle>
            </div>
            {vault.description && (
              <CardDescription className="text-muted font-medium text-sm">
                {vault.description}
              </CardDescription>
            )}
          </div>
          <VaultCardMenu
            formattedName={formattedVaultName}
            vault={vault}
            isActive={isActive}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1">
          <NotepadTextDashedIcon className="text-primary size-4" />
          <span className="text-primary">{noteCount}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default VaultCard
