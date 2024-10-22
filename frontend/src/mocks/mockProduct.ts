import { Product } from '@/types/product'

export const mockProduct: Product = {
  id: 1,
  documentId: 'doc-001',
  Name: 'Sample Product',
  Price: 29.99,
  Description: [
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'This is a description of the sample product.',
        },
      ],
    },
  ],
  Stock: 50,
  Slug: 'sample-product',
  createdAt: '2024-01-01T12:00:00Z',
  updatedAt: '2024-01-10T12:00:00Z',
  publishedAt: '2024-01-05T12:00:00Z',
  locale: 'en',
  Image: [
    {
      id: 1,
      documentId: 'img-001',
      name: 'sample-image',
      alternativeText: 'A sample product image',
      caption: 'This is the caption for the sample product image.',
      width: 800,
      height: 600,
      formats: {
        thumbnail: {
          name: 'thumbnail.jpg',
          hash: 'thumbnail_hash',
          ext: '.jpg',
          mime: 'image/jpeg',
          path: null,
          width: 150,
          height: 100,
          size: 5,
          sizeInBytes: 5120,
          url: 'https://example.com/images/sample-product/thumbnail.jpg',
        },
      },
      hash: 'sample_image_hash',
      ext: '.jpg',
      mime: 'image/jpeg',
      size: 50,
      url: 'https://example.com/images/sample-product.jpg',
      previewUrl: null,
      provider: 'local',
      provider_metadata: null,
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-02T12:00:00Z',
      publishedAt: '2024-01-03T12:00:00Z',
      locale: null,
    },
  ],
}
