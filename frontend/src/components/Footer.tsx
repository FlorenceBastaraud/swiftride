import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black text-white" role="contentinfo">
      <div className="wrapper flex flex-col items-center gap-5 p-1">
        <Link className="transition-effect hover:scale-110" href="/">
          <span className="font-bold italic text-2xl">SwiftRide</span>
        </Link>
        <div className="text-xs">
          <span>&copy; 2024 - </span>
          <Link
            href="https://www.florence-b.com"
            target="_blank"
            className="transition-effect hover:text-blue-300"
          >
            Florence Bastaraud
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
