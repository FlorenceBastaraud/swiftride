'use client'

import HeroSlider from '@/components/HeroSlider'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Product } from '@/data/propTypes/product'
import ProductCard from '@/components/ProductCard'
import Masonry from 'react-masonry-css'
import { GalleryItem } from '@/data/propTypes/media'
import { CategoryType } from '@/data/propTypes/category'

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([])
  const [imagesToShow, setImagesToShow] = useState<number>(6)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/categories?populate=Image`
        )
        setCategories(response.data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const fetchProducts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=Image`
      )
      const filteredProducts = response.data.data
        .filter((product: Product) => product.Stock > 0)
        .sort((a: Product, b: Product) => b.Stock - a.Stock)

      setProducts(filteredProducts)
    }

    const fetchGalleryImages = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/galleries?populate=File`
      )
      console.log(response.data.data)

      setGalleryImages(response.data.data)
    }

    fetchCategories()
    fetchProducts()
    fetchGalleryImages()
  }, [])

  const loadMoreImages = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setImagesToShow((prev) => prev + 6)
      setLoadingMore(false)
    }, 1000)
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <main className="wrapper-flex-1 overflow-x-hidden">
      <HeroSlider data={categories} />
      <section className="wrapper wrapper-py-3">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Best Sellers
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard
              key={product.id}
              productDetails={product}
              isBestSeller={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="wrapper wrapper-p-3">
        <h2 className="text-3xl font-semibold text-center mb-8">Gallery</h2>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {galleryImages.slice(0, imagesToShow).map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={process.env.NEXT_PUBLIC_STRAPI_URL + image.File.url}
                alt={image.File.alternativeText || 'Image ' + image.Nom}
                className="w-full h-auto max-h-80 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center p-3">
                  <h3 className="text-lg font-bold">{image.Nom}</h3>
                </div>
              </div>
            </div>
          ))}
        </Masonry>

        {imagesToShow < galleryImages.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreImages}
              disabled={loadingMore}
              className="text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </section>

      <section className="wrapper">SECTION: Newsletter</section>
    </main>
  )
}
