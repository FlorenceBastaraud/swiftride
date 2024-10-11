'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full transition-colors duration-300 ${
        isScrolled ? 'bg-white text-black' : 'bg-transparent text-white'
      }`}
      style={{ zIndex: 200 }}
    >
      <div className="wrapper flex justify-between">
        <Link
          className={`p-2 transition-effect rounded-2xl hover:scale-110 ${
            isScrolled ? 'hover:text-black' : 'hover:text-white'
          }`}
          href="/"
        >
          <span className="font-bold italic">SwiftRide</span>
        </Link>
        <ul className="flex">
          <Link
            className={`p-2 transition-effect rounded-2xl hover:scale-110 ${
              isScrolled ? 'hover:text-black' : 'hover:text-white'
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`p-2 transition-effect rounded-2xl hover:scale-110 ${
              isScrolled ? 'hover:text-black' : 'hover:text-white'
            }`}
            href="/shop"
          >
            Shop
          </Link>
          <Link
            className={`p-2 transition-effect rounded-2xl hover:scale-110 ${
              isScrolled ? 'hover:text-black' : 'hover:text-white'
            }`}
            href="/gallery"
          >
            Gallery
          </Link>
          <Link
            className={`p-2 transition-effect rounded-2xl hover:scale-110 ${
              isScrolled ? 'hover:text-black' : 'hover:text-white'
            }`}
            href="/contact"
          >
            Contact
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header
