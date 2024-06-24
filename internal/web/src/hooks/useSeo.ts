import { useEffect } from "react"
import { useMatches } from "@tanstack/react-router"

import { seo, SeoProps } from "@/lib/seo"

export const useSeo = () => {
  const matches = useMatches()

  useEffect(() => {
    const setSeoTags = (seoProps: SeoProps) => {
      document.title = seoProps.title
      const metaTags = seo(seoProps)

      metaTags.forEach((tag) => {
        if ("title" in tag) {
          document.title = tag.title
        } else {
          let metaTag = document.querySelector(
            `meta[name="${tag.name}"]`
          ) as HTMLMetaElement | null

          if (!metaTag) {
            metaTag = document.createElement("meta")
            metaTag.setAttribute("name", tag.name)
            document.head.appendChild(metaTag)
          }

          metaTag.setAttribute("content", tag.content)
        }
      })
    }

    const match = [...matches]
      .reverse()
      .find((match) => "getSeo" in match.routeContext)

    if (match && "getSeo" in match.routeContext) {
      const { routeContext } = match
      const seoResult = routeContext.getSeo()
      if (seoResult instanceof Promise) {
        void seoResult.then(setSeoTags)
      } else {
        setSeoTags(seoResult)
      }
    } else if (import.meta.env.DEV) {
      console.warn("No getSeo found in any matching route")
    }
  }, [matches])
}
