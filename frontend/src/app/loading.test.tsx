import React from 'react'
import { render, screen } from '@testing-library/react'
import Loading from './loading'

describe('Loading Component', () => {
  it('renders correctly', () => {
    render(<Loading />)

    const loaderImage = screen.getByAltText('Gif of a loader')
    expect(loaderImage).toBeInTheDocument()

    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass(
      'flex justify-center items-center bg-black text-white h-screen'
    )
  })
})
