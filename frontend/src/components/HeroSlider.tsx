'use client'

import React, { useEffect, useRef } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import Link from 'next/link'
import { Category } from '@/types/category'
import { Product } from '@/types/product'

interface HeroSliderProps {
  data: (Category | Product)[]
  type: string
}

const HeroSlider: React.FC<HeroSliderProps> = ({ data, type }) => {
  const swiperRef = useRef<HTMLDivElement | null>(null)

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
  }, [data])

  return (
    <section
      className="w-full h-hero overflow-hidden relative"
      aria-label="Hero Slider"
    >
      <div className="swiper-hero w-full h-full" ref={swiperRef}>
        <div className="swiper-wrapper w-full h-full">
          {type === 'categories' &&
            (data.length > 0 ? (
              data.map((item) => {
                const imageUrl =
                  process.env.NEXT_PUBLIC_STRAPI_URL + item.Image[0]?.url || ''
                const imageAlt =
                  item.Image[0]?.alternativeText || item.Name + ' image'
                const imageWidth = item.Image[0]?.width || 1280
                const imageHeight = item.Image[0]?.height || 500

                return (
                  <div key={item.id} className="swiper-slide bg-gray-100">
                    <div className="flex h-full relative">
                      <div
                        style={{ zIndex: '600' }}
                        className="flex justify-center items-center flex-col gap-5 w-full text-center"
                      >
                        <h2 className="text-black text-5xl font-bold">
                          {item.Name}
                        </h2>
                        <Link
                          href={'/shop?category=' + item.Slug}
                          className="text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
                          aria-label={`Discover more about ${item.Name}`}
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
                      aria-label="Shop now"
                    >
                      Shop
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          {type === 'products' &&
            data.length > 0 &&
            data.map((item) => {
              const imageUrl = item.Image[0]?.url
                ? process.env.NEXT_PUBLIC_STRAPI_URL + item.Image[0]?.url
                : '/images/default-product-image.png'
              const imageAlt =
                item.Image[0]?.alternativeText || item.Name + ' image'

              if ('category' in item) {
                const imageWidth =
                  item.category.Slug === 'skateboards'
                    ? item.Image[0].width
                    : 150
                const imageHeight =
                  item.category.Slug === 'skateboards'
                    ? item.Image[0].height
                    : 150
                const imageWrapperStyle: React.CSSProperties = {
                  height: imageHeight + 'px',
                  width: imageWidth + 'px',
                  overflow: 'hidden',
                }

                if (item.category.Slug === 'skateboards') {
                  imageWrapperStyle.transform = 'rotate(-90deg)'
                  imageWrapperStyle.marginBottom = '-170px'
                }

                const imageStyle: React.CSSProperties = {
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  transform: 'translate(-50%, -50%)',
                }

                if (item.category.Slug === 'skateboards') {
                  imageStyle.width = '80%'
                  imageStyle.height = '80%'
                }

                return (
                  <div key={item.id} className="swiper-slide">
                    <div className="flex h-full">
                      <div
                        className={`flex items-center flex-col gap-5 w-full text-center${
                          item.category.Slug !== 'skateboards' &&
                          ' justify-center'
                        }`}
                      >
                        {imageUrl && (
                          <div className="relative" style={imageWrapperStyle}>
                            <img
                              src={imageUrl}
                              alt={imageAlt}
                              className="object-contain absolute"
                              style={imageStyle}
                            />
                          </div>
                        )}
                        <h2 className="text-black text-3xl md:text-5xl font-bold">
                          {item.Name}
                        </h2>
                        <h3 className="text-black text-2xl">${item?.Price}</h3>
                        <Link
                          href={'/shop/' + item.Slug}
                          className="text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
                          aria-label={`Discover more about ${item.Name}`}
                        >
                          Product details
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })}
        </div>
      </div>
      {type !== 'products' && (
        <div
          className="absolute left-0 w-full"
          style={{ zIndex: 400, bottom: '-10px' }}
        >
          <svg
            className="w-full h-full"
            id="wave"
            style={{ transition: '0.3s' }}
            viewBox="0 0 1440 120"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stopColor="rgba(255, 255, 255, 1)" offset="0%"></stop>
                <stop stopColor="rgba(255, 255, 255, 1)" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path
              style={{ opacity: '1' }}
              fill="url(#sw-gradient-0)"
              d="M0,0L24,4C48,8,96,16,144,22C192,28,240,32,288,40C336,48,384,60,432,72C480,84,528,96,576,90C624,84,672,60,720,46C768,32,816,28,864,32C912,36,960,48,1008,48C1056,48,1104,36,1152,36C1200,36,1248,48,1296,52C1344,56,1392,52,1440,44C1488,36,1536,24,1584,22C1632,20,1680,28,1728,34C1776,40,1824,44,1872,50C1920,56,1968,64,2016,70C2064,76,2112,80,2160,84C2208,88,2256,92,2304,96C2352,100,2400,104,2448,88C2496,72,2544,36,2592,32C2640,28,2688,56,2736,56C2784,56,2832,36,2880,30C2928,24,2976,36,3024,50C3072,64,3120,80,3168,84C3216,88,3264,76,3328,66C3392,56,3456,48,3520,48C3584,48,3648,56,3680,56C3712,56,3744,48,3776,48C3808,48,3840,56,3872,56C3904,56,3936,48,3968,52C4000,56,4048,72,4080,80C4128,88,4176,88,4224,88C4288,88,4352,88,4416,80C4480,72,4544,56,4608,48C4672,40,4736,32,4800,28C4864,24,4928,24,4992,28C5056,32,5120,40,5184,52C5248,64,5312,76,5376,80C5440,84,5504,76,5568,68C5632,60,5696,52,5760,48C5824,44,5888,36,5952,28C6016,20,6080,12,6144,8C6208,4,6272,0,6336,0L6400,0L6400,0L6400,120L6336,120C6272,120,6208,120,6144,120C6080,120,6016,120,5952,120C5888,120,5824,120,5760,120C5696,120,5632,120,5568,120C5504,120,5440,120,5376,120C5312,120,5248,120,5184,120C5120,120,5056,120,4992,120C4928,120,4864,120,4800,120C4736,120,4672,120,4608,120C4544,120,4480,120,4416,120C4352,120,4288,120,4224,120C4176,120,4128,120,4080,120C4048,120,4000,120,3968,120C3936,120,3904,120,3872,120C3840,120,3808,120,3776,120C3744,120,3712,120,3680,120C3648,120,3584,120,3520,120C3456,120,3392,120,3328,120C3264,120,3216,120,3168,120C3120,120,3072,120,3024,120C2976,120,2928,120,2880,120C2832,120,2784,120,2736,120C2688,120,2640,120,2592,120C2544,120,2496,120,2448,120C2400,120,2352,120,2304,120C2256,120,2208,120,2160,120C2112,120,2064,120,2016,120C1968,120,1920,120,1872,120C1824,120,1776,120,1728,120C1680,120,1632,120,1584,120C1536,120,1488,120,1440,120C1392,120,1344,120,1296,120C1248,120,1200,120,1152,120C1104,120,1056,120,1008,120C960,120,912,120,864,120C816,120,768,120,720,120C672,120,624,120,576,120C528,120,480,120,432,120C384,120,336,120,288,120C240,120,192,120,144,120C96,120,48,120,0,120Z"
            ></path>
          </svg>
        </div>
      )}
    </section>
  )
}

export default HeroSlider
