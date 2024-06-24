export interface SeoProps {
  title: string
  description?: string
  image?: string
  keywords?: string
}

interface TitleTag {
  title: string
}

interface MetaTag {
  name: string
  content: string
}

type SeoTag = TitleTag | MetaTag

export const seo = ({
  title,
  description,
  keywords,
  image,
}: SeoProps): SeoTag[] => {
  const tags: SeoTag[] = [
    { title },
    { name: "description", content: description || "" },
    { name: "keywords", content: keywords || "" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description || "" },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description || "" },
  ]

  if (image) {
    tags.push(
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    )
  }

  return tags
}
