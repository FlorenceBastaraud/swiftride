'use client'

import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import axios from 'axios'
import { CategoryType } from '@/data/propTypes/category'
import Link from 'next/link'

const HeroSlider = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])

  const swiperRef = useRef<HTMLDivElement | null>(null)

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

    fetchCategories()
  }, [])

  useEffect(() => {
    let swiperInstance: Swiper | null = null

    if (swiperRef.current) {
      swiperInstance = new Swiper(swiperRef.current, {
        loop: true,
        autoplay: {
          delay: 5000,
        },
        slidesPerView: 1,
      })
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy()
      }
    }
  }, [categories])

  return (
    <section className="w-full h-hero overflow-hidden relative">
      <div className="swiper-hero w-full h-full" ref={swiperRef}>
        <div className="swiper-wrapper w-full h-full">
          {categories.length > 0 ? (
            categories.map((category) => {
              const imageUrl =
                process.env.NEXT_PUBLIC_STRAPI_URL + category.Image[0]?.url ||
                ''
              const imageAlt =
                category.Image[0]?.alternativeText || category.Name + ' image'
              const imageWidth = category.Image[0]?.width || 1280
              const imageHeight = category.Image[0]?.height || 500

              return (
                <div key={category.id} className="swiper-slide bg-gray-100">
                  <div className="flex h-full relative">
                    <div
                      style={{ zIndex: '600' }}
                      className="flex justify-center items-center flex-col gap-5 w-full text-center"
                    >
                      <h2 className="text-black text-5xl font-bold">
                        {category.Name}
                      </h2>
                      <Link
                        href={'/' + category.Slug}
                        className="text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
                      >
                        Discover more
                      </Link>
                    </div>
                    {imageUrl ? (
                      <div className="w-full h-full absolute top-0 left-0 zIndex-minus md:relative">
                        <img
                          src={imageUrl}
                          alt={imageAlt}
                          width={imageWidth}
                          height={imageHeight}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="swiper-slide">
              <div className="w-full h-full relative">
                <img
                  src="/images/default-hero.jpg"
                  alt="A skateboarder performs an impressive trick mid-air, showcasing skill and balance against an urban backdrop."
                  className="w-full h-full object-cover"
                />
                <div
                  style={{ zIndex: '100' }}
                  className="absolute flex top-0 left-0 justify-center items-center flex-col gap-5 w-full h-full text-center"
                >
                  <h2 className="text-white text-5xl font-bold">SwiftRide</h2>
                  <Link
                    href="/shop"
                    className="text-black bg-white py-2 px-4 border border-transparent rounded-2xl transition-effect hover:bg-black hover:text-white hover:border-white"
                  >
                    Shop
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 400 }}>
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 240"
        >
          <path
            fill="#FFF"
            fillOpacity="1"
            d="M0,192L80,208C160,224,320,256,480,250.7C640,245,800,203,960,197.3C1120,192,1280,224,1360,240L1440,240L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSlider
