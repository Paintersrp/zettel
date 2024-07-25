import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ElementRef,
  type FC,
} from "react"
import type { cva, VariantProps } from "class-variance-authority"

import { cn } from "./cn"

export function withVariants<
  T extends ComponentType<any> | keyof HTMLElementTagNameMap,
  V extends ReturnType<typeof cva>,
>(Component: T, variants: V, onlyVariantsProps?: (keyof VariantProps<V>)[]) {
  const ComponentWithClassName = Component as FC<{ className: string }>

  return forwardRef<
    ElementRef<T>,
    ComponentPropsWithoutRef<T> & VariantProps<V>
  >(function ExtendComponent(allProps, ref) {
    const { className, ...props } = allProps as any
    const rest = { ...props }

    if (onlyVariantsProps) {
      onlyVariantsProps.forEach((key) => {
        if (props[key as string] !== undefined) {
          delete rest[key as string]
        }
      })
    }

    return (
      <ComponentWithClassName
        className={cn(variants(props), className)}
        ref={ref}
        {...(rest as any)}
      />
    )
  })
}
