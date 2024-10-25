'use client'

import HeroSlider from '@/components/HeroSlider'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ScrollDownArrow from '@/components/ScrollDownArrow'

const productsPerPage = 9
type categoriesArrType = { name: string; slug: string }

export default function Shop() {
  const searchParams = useSearchParams()

  const [featuredProducts, setFeaturedProducts] = useState<Product[] | []>([])
  const [products, setProducts] = useState<Product[] | []>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [categories, setCategories] = useState<categoriesArrType[]>([])
  const [isCategoryShop, setIsCategoryShop] = useState<boolean>(false)

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [inStock, setInStock] = useState<boolean>(false)

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(1000)

  async function getProducts() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=*`
      )

      const productData: Product[] = response.data.data

      const featuredProductsData: Product[] = productData.filter(
        (product: Product) => product?.featured
      )

      const productCategories: categoriesArrType[] = []
      productData.forEach((product) => {
        const categorySlug = product.category.Slug

        if (
          !productCategories.some((category) => category.slug === categorySlug)
        ) {
          productCategories.push({
            name: product.category.Name,
            slug: categorySlug,
          })
        }
      })

      const uniqueProductCategories: categoriesArrType[] = Array.from(
        new Map(
          productCategories.map((category) => [category.slug, category])
        ).values()
      )

      const prices = productData.map((product) => product.Price)
      const minProductPrice = Math.min(...prices)
      const maxProductPrice = Math.max(...prices)

      setMinPrice(minProductPrice)
      setMaxPrice(maxProductPrice)
      setPriceRange([minProductPrice, maxProductPrice])

      setFeaturedProducts(featuredProductsData)
      setProducts(productData)
      setCategories(uniqueProductCategories)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get('category')

    if (categoryParam) {
      setSelectedCategory(categoryParam)
      setIsCategoryShop(true)
    }
  }, [searchParams])

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category?.Slug === selectedCategory
      const matchesPrice =
        product.Price >= priceRange[0] && product.Price <= priceRange[1]
      const matchesStock = !inStock || product.Stock > 0

      return matchesCategory && matchesPrice && matchesStock
    })
    .sort((a, b) => {
      return sortOrder === 'asc' ? a.Price - b.Price : b.Price - a.Price
    })

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  function handlePagination(page: number) {
    setCurrentPage(page)
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(event.target.value)
    setCurrentPage(1)
  }

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPriceRange([priceRange[0], parseInt(event.target.value)])
    setCurrentPage(1)
  }

  function handleInStockChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInStock(event.target.checked)
    setCurrentPage(1)
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortOrder(event.target.value as 'asc' | 'desc')
    setCurrentPage(1)
  }

  const productShopStyle: {
    marginTop?: string
  } = {}
  if (!isCategoryShop) {
    productShopStyle.marginTop = '80px'
  }

  return (
    <main className="wrapper-flex-1 overflow-x-hidden">
      {!isCategoryShop && (
        <>
          <HeroSlider data={featuredProducts} type="products" />
          <ScrollDownArrow />
        </>
      )}

      <section
        className="wrapper wrapper-py-3 gap-14 flex flex-col max-sm:mt-6 filters:flex-row max-filters:items-center"
        style={productShopStyle}
      >
        <div className="max-sm:hidden max-filters:w-fit max-filters:border-2 max-filters:gap-6 max-filters:justify-center py-4 px-4 flex flex-col filters:space-y-6 filters:border-r-2 rounded-2xl max-filters:flex-row">
          {!isCategoryShop && (
            <div className="flex flex-col">
              <label className="mb-1 font-bold text-blue-900">Category: </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="filters:ml-2"
              >
                <option value="all">All Categories</option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option value={category.slug} key={category.slug}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-blue-900">Max Price: </label>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="filters:ml-2"
            />
            <span className="filters:ml-2">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-bold text-blue-900">
              In Stock
              <input
                type="checkbox"
                checked={inStock}
                onChange={handleInStockChange}
                className="filters:ml-2 max-filters:block"
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-bold text-blue-900">
              Sort by Price:{' '}
            </label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="filters:ml-2"
            >
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>

          <div className="text-sm font-medium text-gray-600 max-filters:hidden filters:mt-20">
            {filteredProducts.length} products found
          </div>
        </div>

        <div
          className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4"
          style={{ paddingBottom: '120px' }}
        >
          {paginatedProducts.length > 0 &&
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} productDetails={product} />
            ))}

          {totalPages > 1 && (
            <div
              className="absolute bottom-0 pagination flex justify-center my-8 gap-3"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePagination(index + 1)}
                  className={`transition-effect gap-5 bg-black-500 bg-black h-8 w-8 rounded-full shadow-lg transition-opacity duration-300 hover:bg-blue-400 hover:scale-110 flex items-center justify-center ${
                    currentPage === index + 1
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
