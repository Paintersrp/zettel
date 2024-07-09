"use client"

import { useMemo, type FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { capFirst } from "@/lib/string"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"

interface BreadcrumbSegmentProps {
  segment: string
  index: number
  isLast: boolean
  path: string
}

const BreadcrumbSegment: FC<BreadcrumbSegmentProps> = ({
  segment,
  index,
  isLast,
  path,
}) => {
  const formattedSegment = capFirst(segment)

  if (index === 0) {
    return (
      <BreadcrumbItem>
        {isLast ? (
          <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={`/${segment}`}>{formattedSegment}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    )
  }

  console.log(formattedSegment, isLast)

  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem className={isLast ? "" : ""}>
        {isLast ? (
          <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={path}>{formattedSegment}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    </>
  )
}

interface BreadcrumbsProps {}

export const Breadcrumbs: FC<BreadcrumbsProps> = () => {
  const pathname = usePathname()

  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split("/").filter(Boolean)
    return pathSegments.map((segment, index) => ({
      segment,
      path: `/${pathSegments.slice(0, index + 1).join("/")}`,
      isLast: index === pathSegments.length - 1,
    }))
  }, [pathname])

  return (
    <Breadcrumb className="hidden md:flex flex-nowrap py-1.5 px-3">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbSegment key={crumb.path} index={index} {...crumb} />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
