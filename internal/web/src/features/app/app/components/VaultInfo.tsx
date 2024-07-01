import { type FC } from "react"

import { formatVaultName } from "@/lib/utils"

import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { useAuth } from "@/features/auth/providers"

export const VaultInfo: FC = () => {
  const { user } = useAuth()

  if (!user || !user.active_vault) {
    return null
  }

  const { description, name, note_count } = user.active_vault
  const formattedName = formatVaultName(name)

  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>Active Vault</CardTitle>
      </CardHeader>
      <CardContent>
        {user?.active_vault ? (
          <div>
            <h3 className="text-lg font-semibold">{formattedName}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Notes</span>
              <Badge variant="secondary">{note_count}</Badge>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No active vault</p>
        )}
      </CardContent>
    </Card>
  )
}
