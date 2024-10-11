'use client'

import React, { useEffect, useState } from 'react'

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-black-500 bg-black text-white h-8 w-8 rounded-full shadow-lg transition-opacity duration-300 hover:bg-blue-400 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  )
}

export default ScrollToTopButton
