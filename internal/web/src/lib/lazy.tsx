/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense } from "react"
import { ReactNode } from "@tanstack/react-router"

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

const loadingLazy = (
  importFunc: () => LazyComponentPromise,
  loader?: ReactNode
) => {
  const LazyComponent = lazy(importFunc)

  return (props: any) => (
    <Suspense fallback={loader ? loader : <Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export { nullLazy, loadingLazy }
