'use client'

import { useState, useEffect } from 'react'

const Notification = () => {
  const [isVisible, setIsVisible] = useState(true)

  const closeNotification = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    const timer = setTimeout(closeNotification, 10000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null
  return (
    <div className="fixed bottom-4 left-0 right-0 text-white text-center text-sm z-50 flex justify-center items-center">
      <p className="bg-blue-950 w-fit flex justify-between items-center gap-5 py-2 px-5 rounded-lg">
        <em>
          <b>DISCLAIMER</b>: This website is a demonstration project.{' '}
          <u>The products are not real</u>, and <u>payments are simulated</u>.
        </em>
        <button
          onClick={closeNotification}
          className="text-white bg-transparent border-none cursor-pointer"
        >
          X
        </button>
      </p>
    </div>
  )
}

export default Notification
