'use client'

import React, { useEffect, useRef } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import Link from 'next/link'
import { CategoryType } from '@/data/propTypes/category'

interface HeroSliderProps {
  data: CategoryType[]
}

const HeroSlider: React.FC<HeroSliderProps> = ({ data }) => {
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
          {data.length > 0 ? (
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
                        href={'/' + item.Slug}
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
          )}
        </div>
      </div>
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
            d="M0,0L24,4C48,8,96,16,144,22C192,28,240,32,288,40C336,48,384,60,432,72C480,84,528,96,576,90C624,84,672,60,720,46C768,32,816,28,864,32C912,36,960,48,1008,48C1056,48,1104,36,1152,36C1200,36,1248,48,1296,52C1344,56,1392,52,1440,44C1488,36,1536,24,1584,22C1632,20,1680,28,1728,34C1776,40,1824,44,1872,50C1920,56,1968,64,2016,70C2064,76,2112,80,2160,84C2208,88,2256,92,2304,96C2352,100,2400,104,2448,88C2496,72,2544,36,2592,32C2640,28,2688,56,2736,62C2784,68,2832,52,2880,56C2928,60,2976,84,3024,92C3072,100,3120,92,3168,78C3216,64,3264,44,3312,48C3360,52,3408,80,3432,94L3456,108L3456,120L3432,120C3408,120,3360,120,3312,120C3264,120,3216,120,3168,120C3120,120,3072,120,3024,120C2976,120,2928,120,2880,120C2832,120,2784,120,2736,120C2688,120,2640,120,2592,120C2544,120,2496,120,2448,120C2400,120,2352,120,2304,120C2256,120,2208,120,2160,120C2112,120,2064,120,2016,120C1968,120,1920,120,1872,120C1824,120,1776,120,1728,120C1680,120,1632,120,1584,120C1536,120,1488,120,1440,120C1392,120,1344,120,1296,120C1248,120,1200,120,1152,120C1104,120,1056,120,1008,120C960,120,912,120,864,120C816,120,768,120,720,120C672,120,624,120,576,120C528,120,480,120,432,120C384,120,336,120,288,120C240,120,192,120,144,120C96,120,48,120,24,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSlider
