interface MediaFileFormat {
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

interface MediaFile {
  id: number
  documentId: string
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    thumbnail: MediaFileFormat
    large: MediaFileFormat
    medium: MediaFileFormat
    small: MediaFileFormat
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
}

export interface GalleryItem {
  id: number
  documentId: string
  Nom: string
  Description: string
  Tags: {
    tags: string[]
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string | null
  Alt: string
  File: MediaFile
}
