import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ElementRef,
  type ForwardRefRenderFunction,
} from "react"

export function withRef<
  T extends ComponentType<any> | keyof HTMLElementTagNameMap,
  E = {},
>(
  renderFunction: ForwardRefRenderFunction<
    ElementRef<T>,
    E & Omit<ComponentPropsWithoutRef<T>, keyof E>
  >
) {
  return forwardRef(renderFunction)
}
