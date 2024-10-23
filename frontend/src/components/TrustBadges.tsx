'use client'

import { trustBadges } from '@/staticData/trustBadges'

const TrustBadges: React.FC = () => {
  return (
    <section className="wrapper wrapper-py-3 mt50">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Trusted by Customers
      </h2>
      <div className="flex justify-center flex-wrap gap-10 max-w-7xl mx-auto px-4">
        {trustBadges.map((badge) => (
          <div key={badge.id} className="flex flex-col items-center">
            <img
              src={badge.src}
              alt={badge.alt}
              className="w-24 h-24 object-contain mb-2"
            />
            <span className="text-lg font-medium">{badge.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustBadges
