import React, { FC } from "react"
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

interface BreadcrumbsProps {}

export const Breadcrumbs: FC<BreadcrumbsProps> = () => {
  const router = useRouter()
  const pathSegments = router.state.location.pathname.split("/").filter(Boolean)

  return (
    <Breadcrumb className="hidden md:flex flex-nowrap">
      <BreadcrumbList>
        {pathSegments.length === 1
          ? null
          : pathSegments.map((segment, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${segment}`}>{capFirst(segment)}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ) : index === pathSegments.length - 1 ? (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="mr-8">
                      <BreadcrumbPage>{capFirst(segment)}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link
                          to={`/${pathSegments.slice(0, index + 1).join("/")}`}
                        >
                          {capFirst(segment)}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
              </React.Fragment>
            ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
