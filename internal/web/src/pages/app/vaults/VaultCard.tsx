import React from "react"
import { MoreHorizontalIcon, NotepadTextDashedIcon } from "lucide-react"

import { Vault } from "@/types/app"
import { capFirst } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

interface VaultCardProps {
  vault: Vault
}

const VaultCard: React.FC<VaultCardProps> = ({ vault }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div className="space-y-1">
            <CardTitle>{capFirst(vault.name)}</CardTitle>
            <CardDescription className="text-muted font-medium text-sm">
              Description placeholder.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="iconSm"
            className="text-muted hover:text-primary"
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
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
