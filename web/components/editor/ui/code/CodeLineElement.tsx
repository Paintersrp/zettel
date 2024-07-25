"use client"

import { PlateElement } from "@udecode/plate-common"

import { withRef } from "@/utils/withRef"

export const CodeLineElement = withRef<typeof PlateElement>((props, ref) => (
  <PlateElement ref={ref} {...props} />
))
