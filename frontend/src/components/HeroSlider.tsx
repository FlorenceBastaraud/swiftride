'use client'

import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import axios from 'axios'
import { CategoryType } from '@/data/propTypes/category'
import Link from 'next/link'
import { shuffleColors, colors } from '@/utils/functions'

const HeroSlider = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [shuffledColors, setShuffledColors] = useState<string[]>([])

  const swiperRef = useRef<HTMLDivElement | null>(null)
  const swiperBtnNext = useRef<HTMLDivElement | null>(null)
  const swiperBtnPrev = useRef<HTMLDivElement | null>(null)

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

    setShuffledColors(shuffleColors(colors))
  }, [])

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        loop: true,
        autoplay: {
          delay: 5000,
        },
        slidesPerView: 1,
        navigation: {
          nextEl: swiperBtnNext.current,
          prevEl: swiperBtnPrev.current,
        },
      })
    }
  }, [categories])

  return (
    <section className="w-full h-hero overflow-hidden">
      <div className="swiper-hero w-full h-full" ref={swiperRef}>
        <div className="swiper-wrapper w-full h-full">
          {categories.length > 0 ? (
            categories.map((category, index) => {
              const imageUrl =
                process.env.NEXT_PUBLIC_STRAPI_URL + category.Image[0]?.url ||
                ''
              const imageAlt =
                category.Image[0]?.alternativeText || category.Name + ' image'
              const imageWidth = category.Image[0]?.width || 1280
              const imageHeight = category.Image[0]?.height || 500

              const uniqueColor = shuffledColors[index % shuffledColors.length]

              return (
                <div
                  key={category.id}
                  className="swiper-slide"
                  style={{ backgroundColor: uniqueColor }}
                >
                  <div className="flex h-full relative">
                    <div
                      style={{ zIndex: '100' }}
                      className="flex justify-center items-center flex-col gap-5 w-full text-center"
                    >
                      <h2 className="text-black text-5xl font-bold">
                        {category.Name}
                      </h2>
                      <Link
                        href={'/' + category.Slug}
                        className="text-white bg-black py-2 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
                      >
                        Shop {category.Name}
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
            <div
              className="swiper-slide"
              style={{ backgroundColor: colors[0] }}
            >
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

        <div className="swiper-button-prev" ref={swiperBtnPrev}></div>
        <div className="swiper-button-next" ref={swiperBtnNext}></div>
      </div>
    </section>
  )
}

export default HeroSlider
