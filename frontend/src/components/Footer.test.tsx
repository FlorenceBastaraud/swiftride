import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('Footer component', () => {
  it('renders the SwiftRide link with correct href', () => {
    render(<Footer />)

    const swiftRideLink = screen.getByRole('link', { name: /swiftride/i })
    expect(swiftRideLink).toBeInTheDocument()
    expect(swiftRideLink).toHaveAttribute('href', '/')
  })

  it('renders the Florence Bastaraud link with correct href and target', () => {
    render(<Footer />)

    const florenceLink = screen.getByRole('link', {
      name: /florence bastaraud/i,
    })
    expect(florenceLink).toBeInTheDocument()
    expect(florenceLink).toHaveAttribute('href', 'https://www.florence-b.com')
    expect(florenceLink).toHaveAttribute('target', '_blank')
  })
})
