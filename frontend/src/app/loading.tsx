import React from 'react'
import Image from 'next/image'

const loading = () => {
  return (
    <main
      role="main"
      className="flex justify-center
items-center bg-black text-white h-screen"
    >
      <Image
        src="/images/loader-swiftride.gif"
        alt="Gif of a loader"
        width={80}
        height={80}
      ></Image>
    </main>
  )
}

export default loading
