"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
  ssr: false,
})
const QuickAccessModal = dynamic(
  () => import("./quickAccess/QuickAccessModal"),
  { ssr: false }
)
const VaultCreateModal = dynamic(() => import("./vaults/VaultCreateModal"), {
  ssr: false,
})
const VaultUpdateModal = dynamic(() => import("./vaults/VaultUpdateModal"), {
  ssr: false,
})

export const AppModals = () => {
  return (
    <Suspense fallback={null}>
      <QuickAccessModal />
      <VaultCreateModal />
      <VaultUpdateModal />
      <ScrollToTop />
    </Suspense>
  )
}

export default AppModals
