export type Product = {
  id: number
  documentId: string
  Name: string
  Price: number
  featured: boolean
  Description: Array<{
    type: string
    children: Array<{
      type: string
      text: string
    }>
  }>
  Stock: number
  Slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string | null
  Image: Array<{
    id: number
    documentId: string
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
      thumbnail: {
        name: string
        hash: string
        ext: string
        mime: string
        path: string | null
        width: number
        height: number
        size: number
        sizeInBytes: number
        url: string
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string | null
  }>
}
