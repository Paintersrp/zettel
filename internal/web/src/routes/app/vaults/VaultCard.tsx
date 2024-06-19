import React from "react"
import { NotepadTextDashedIcon, StarIcon } from "lucide-react"

import { Vault } from "@/types/app"
import { capFirst } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

import VaultCardMenu from "./VaultCardMenu"

interface VaultCardProps {
  vault: Vault
  isActive?: boolean
}

// TODO: Mobile Styles

const VaultCard: React.FC<VaultCardProps> = ({ vault, isActive = false }) => {
  return (
    <Card className="transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              {isActive && <StarIcon className="text-primary size-5" />}
              <CardTitle>{capFirst(vault.name)}</CardTitle>
            </div>
            <CardDescription className="text-muted font-medium text-sm">
              Description placeholder.
            </CardDescription>
          </div>
          <VaultCardMenu vault={vault} isActive={isActive} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1">
          <NotepadTextDashedIcon className="text-primary size-4" />
          <span className="text-primary">
            {vault.note_count} Note{vault.note_count > 1 ? "s" : ""}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default VaultCard