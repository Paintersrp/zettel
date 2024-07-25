import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ElementRef,
  type FC,
} from "react"

import { cn } from "./cn"

export function withProps<
  T extends ComponentType<any> | keyof HTMLElementTagNameMap,
>(Component: T, defaultProps: Partial<ComponentPropsWithoutRef<T>>) {
  const ComponentWithClassName = Component as FC<{ className: string }>

  return forwardRef<ElementRef<T>, ComponentPropsWithoutRef<T>>(
    function ExtendComponent(props, ref) {
      return (
        <ComponentWithClassName
          ref={ref}
          {...defaultProps}
          {...props}
          className={cn(
            (defaultProps as any).className,
            (props as any).className
          )}
        />
      )
    }
  )
}
