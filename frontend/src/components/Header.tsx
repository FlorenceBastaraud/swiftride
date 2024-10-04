import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-black text-white">
      <div className="wrapper flex justify-between">
        <Link
          className="p-2 transition-effect hover:bg-white hover:text-black"
          href="/"
        >
          <span className="font-bold italic">SwiftRide</span>
        </Link>
        <ul className="flex">
          <Link
            className="p-2 transition-effect hover:bg-white hover:text-black"
            href="/"
          >
            Home
          </Link>
          <Link
            className="p-2 transition-effect hover:bg-white hover:text-black"
            href="/shop"
          >
            Shop
          </Link>
          <Link
            className="p-2 transition-effect hover:bg-white hover:text-black"
            href="/gallery"
          >
            Gallery
          </Link>
          <Link
            className="p-2 transition-effect hover:bg-white hover:text-black"
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
