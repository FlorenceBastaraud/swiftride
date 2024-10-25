import { render, screen } from '@testing-library/react'
import HeroSlider from './HeroSlider'
import '@testing-library/jest-dom'
import { mockCategory } from '../mocks/mockCategory'
import React from 'react'

describe('HeroSlider', () => {
  it('renders correctly with data', () => {
    render(<HeroSlider data={mockCategory} type="" />)

    const headingElement = screen.getByRole('heading', {
      name: /sample category/i,
    })
    expect(headingElement).toBeInTheDocument()

    const discoverButton = screen.getByRole('link', { name: /discover more/i })
    expect(discoverButton).toBeInTheDocument()
  })

  it('renders correctly with no data', () => {
    render(<HeroSlider data={[]} type="" />)

    const defaultImage = screen.getByAltText(
      /a skateboarder performs an impressive trick mid-air/i
    )
    expect(defaultImage).toBeInTheDocument()

    const defaultHeading = screen.getByRole('heading', { name: /swiftride/i })
    expect(defaultHeading).toBeInTheDocument()

    const shopButton = screen.getByRole('link', { name: /shop/i })
    expect(shopButton).toBeInTheDocument()
  })
})
