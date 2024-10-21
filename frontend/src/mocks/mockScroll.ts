import { fireEvent } from '@testing-library/dom'

export const mockScroll = (scrollY: number) => {
  Object.defineProperty(window, 'scrollY', {
    value: scrollY,
    writable: true,
  })
  fireEvent(window, new Event('scroll'))
}
