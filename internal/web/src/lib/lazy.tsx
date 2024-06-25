import { lazy, Suspense } from "react"

import { Loading } from "@/components/Loading"

type LazyComponentPromise = Promise<{
  default: React.ComponentType<any>
}>

const nullLazy = (importFunc: () => LazyComponentPromise) => {
  const LazyComponent = lazy(importFunc)

  return (props: any) => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

const loadingLazy = (importFunc: () => LazyComponentPromise) => {
  const LazyComponent = lazy(importFunc)

  return (props: any) => (
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export { nullLazy, loadingLazy }
