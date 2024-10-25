import { render, screen } from '@testing-library/react'
import Header from './Header'
import React from 'react'
import { mockScroll } from '../mocks/mockScroll'

describe('Header component', () => {
  it('renders the header with default styling', () => {
    render(<Header />)

    const headerElement = screen.getByRole('banner')
    expect(headerElement).toHaveClass('bg-transparent', 'text-white')
  })

  it('changes styling when scrolling past 50px', () => {
    render(<Header />)
    const headerElement = screen.getByRole('banner')

    mockScroll(100)
    expect(headerElement).toHaveClass('bg-white', 'text-black')

    mockScroll(0)
    expect(headerElement).toHaveClass('bg-transparent', 'text-white')
  })

  it('renders menu links with correct href', () => {
    render(<Header />)

    const homeLink = screen.getByRole('link', { name: /home/i })
    const shopLink = screen.getByRole('link', { name: /shop/i })
    const contactLink = screen.getByRole('link', { name: /contact/i })

    expect(homeLink).toBeInTheDocument()
    expect(shopLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()

    expect(homeLink).toHaveAttribute('href', '/')
    expect(shopLink).toHaveAttribute('href', '/shop')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })
})
