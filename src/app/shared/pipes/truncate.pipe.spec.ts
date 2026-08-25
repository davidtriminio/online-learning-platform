import { TruncatePipe } from './truncate.pipe'
import { expect } from 'vitest'

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe()

  it('leaves short text untouched', () => {
    expect(pipe.transform('hello', 20)).toBe('hello')
  })

  it('truncates at a word boundary with ellipsis', () => {
    expect(pipe.transform('the quick brown fox', 12)).toBe('the quick…')
  })

  it('return empty for nullish', () => {
    expect(pipe.transform(null)).toBe('')
  })
})
