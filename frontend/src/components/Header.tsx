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
      style={{ zIndex: 400 }}
    >
      <div className="wrapper flex justify-between items-center p-4">
        <Link
          className={`p-2 transition-effect rounded-2xl hover:scale-110 text-black ${
            isScrolled ? ' text-blue-900' : ' text-black'
          }`}
          href="/"
        >
          <span className="font-bold italic">SwiftRide</span>
        </Link>
        <ul className="flex md:space-x-4">
          <li>
            <Link
              className={`p-2 transition-effect rounded-2xl ${
                isScrolled
                  ? 'text-blue-900 hover:text-blue-400'
                  : 'text-black hover:text-gray-400'
              }`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`p-2 transition-effect rounded-2xl ${
                isScrolled
                  ? 'text-blue-900 hover:text-blue-400'
                  : 'text-black hover:text-gray-400'
              }`}
              href="/shop"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              className={`p-2 transition-effect rounded-2xl ${
                isScrolled
                  ? 'text-blue-900 hover:text-blue-400'
                  : 'text-black hover:text-gray-400'
              }`}
              href="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
