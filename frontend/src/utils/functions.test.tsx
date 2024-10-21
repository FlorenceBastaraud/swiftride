import { describe, it, expect } from 'vitest'
import { stripText } from './functions'

describe('stripText', () => {
  it('should return the original text when the text length is less than the limit', () => {
    const result = stripText('Hello', 10)
    expect(result).toBe('Hello')
  })

  it('should return the truncated text followed by "..." when the text length exceeds the limit', () => {
    const result = stripText('This is a long text that should be truncated', 10)
    expect(result).toBe('This is a ...')
  })

  it('should handle exact limit cases without adding "..."', () => {
    const result = stripText('Exact length', 12)
    expect(result).toBe('Exact length')
  })

  it('should return an empty string if the input text is empty', () => {
    const result = stripText('', 5)
    expect(result).toBe('')
  })

  it('should handle cases where the limit is zero', () => {
    const result = stripText('Some text', 0)
    expect(result).toBe('...')
  })

  it('should handle cases where the limit is negative', () => {
    const result = stripText('Negative limit case', -5)
    expect(result).toBe('...')
  })
})
