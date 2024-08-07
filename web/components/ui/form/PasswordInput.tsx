import { forwardRef, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button/Button"

import { Input, InputProps } from "./Input"

const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10 text-sm", className)}
          ref={ref}
          {...props}
        />

        <Button
          variant="link"
          type="button"
          className="absolute right-0 top-0 flex h-full items-center justify-center pr-3"
          aria-label={showPassword ? "Mask password" : "Reveal password"}
          onClick={() => setShowPassword((show) => !show)}
        >
          {showPassword ? (
            <EyeOffIcon aria-hidden className="text-muted-foreground size-5" />
          ) : (
            <EyeIcon aria-hidden className="text-muted-foreground size-5" />
          )}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
