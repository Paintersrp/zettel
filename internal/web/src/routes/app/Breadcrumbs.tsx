import { useMemo, type FC } from "react"
import { Link, useRouter } from "@tanstack/react-router"

import { capFirst } from "@/lib/utils"
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
        <BreadcrumbLink asChild>
          <Link to={`/${segment}`}>{formattedSegment}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    )
  }

  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem className={isLast ? "mr-8" : ""}>
        {isLast ? (
          <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link to={path}>{formattedSegment}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    </>
  )
}

interface BreadcrumbsProps {}

export const Breadcrumbs: FC<BreadcrumbsProps> = () => {
  const router = useRouter()

  const breadcrumbs = useMemo(() => {
    const pathSegments = router.state.location.pathname
      .split("/")
      .filter(Boolean)
    return pathSegments.map((segment, index) => ({
      segment,
      path: `/${pathSegments.slice(0, index + 1).join("/")}`,
      isLast: index === pathSegments.length - 1,
    }))
  }, [router.state.location.pathname])

  if (breadcrumbs.length <= 1) return null

  return (
    <Breadcrumb className="hidden md:flex flex-nowrap">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbSegment key={crumb.path} index={index} {...crumb} />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
