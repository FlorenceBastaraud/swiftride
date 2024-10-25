import React from 'react'

interface HeroBannerProps {
  imageUrl: string
  title: string
  height: string
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageUrl,
  title,
  height = 'h-hero',
}) => {
  return (
    <section
      className={`w-full overflow-hidden relative flex items-center justify-center bg-cover bg-center ${height}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 h-full"></div>
      <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white text-center px-4">
        {title}
      </h1>
    </section>
  )
}

export default HeroBanner
