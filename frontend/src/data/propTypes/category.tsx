export interface ImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

export interface Image {
  id: number
  documentId: string
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    thumbnail: ImageFormat
    small: ImageFormat
    medium: ImageFormat
    large: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string | null
}

export interface CategoryDescription {
  type: string
  children: {
    type: string
    text: string
  }[]
}

export interface CategoryType {
  id: number
  documentId: string
  Name: string
  Slug: string
  Description: CategoryDescription[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string | null
  Image: Image[]
}
