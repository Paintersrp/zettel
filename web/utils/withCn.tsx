import type { ComponentType } from "react"
import type { CxOptions } from "class-variance-authority"

import { cn } from "./cn"
import { withProps } from "./withProps"

export function withCn<T extends ComponentType<any>>(
  Component: T,
  ...inputs: CxOptions
) {
  return withProps(Component, { className: cn(inputs) } as any)
}
