type Procedure = (...args: any[]) => void

export const debounce = (
  func: Procedure,
  wait: number,
  leading: boolean = false
): Procedure => {
  let timeout: NodeJS.Timeout | null

  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    if (leading && !timeout) {
      func.apply(this, args)
    }

    timeout = setTimeout(() => {
      timeout = null
      if (!leading) {
        func.apply(this, args)
      }
    }, wait)
  }
}
