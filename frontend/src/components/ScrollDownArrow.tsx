import React from 'react'

const ScrollDownArrow = () => {
  return (
    <div className="scroll-down-arrow flex flex-col justify-center items-center">
      <span className="text-sm mb-2">Scroll down</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m0 0l-4-4m4 4l4-4"
        />
      </svg>
    </div>
  )
}

export default ScrollDownArrow
