import { render, screen } from '@testing-library/react'
import ScrollToTopButton from './ScrollToTopButton'
import { vi } from 'vitest'
import React from 'react'
import { mockScroll } from '../mocks/mockScroll'
import { fireEvent } from '@testing-library/react'

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should not be visible initially', () => {
    render(<ScrollToTopButton />)
    const button = screen.queryByRole('button', { name: /scroll to top/i })
    expect(button).toBeNull()
  })

  it('should appear after scrolling down', () => {
    render(<ScrollToTopButton />)

    mockScroll(301)

    const button = screen.getByRole('button', { name: /scroll to top/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeVisible()
  })

  it('should disappear when scrolling back up', () => {
    render(<ScrollToTopButton />)

    mockScroll(301)
    const button = screen.getByRole('button', { name: /scroll to top/i })
    expect(button).toBeInTheDocument()

    mockScroll(100)
    expect(screen.queryByRole('button', { name: /scroll to top/i })).toBeNull()
  })

  it('should scroll to top when clicked', () => {
    render(<ScrollToTopButton />)

    mockScroll(301)

    const button = screen.getByRole('button', { name: /scroll to top/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })
})
