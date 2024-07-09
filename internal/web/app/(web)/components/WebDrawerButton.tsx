import { FC } from "react"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"

interface WebDrawerButtonProps {}

export const WebDrawerButton: FC<WebDrawerButtonProps> = () => {
  return (
    <Button
      size="iconSm"
      variant="ghost"
      className="bg-background hover:bg-card"
    >
      <MenuIcon className="size-6 text-primary" />
      <span className="sr-only">Open Menu</span>
    </Button>
  )
}

export default WebDrawerButton
