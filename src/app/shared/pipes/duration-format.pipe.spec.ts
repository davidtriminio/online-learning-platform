import { describe, expect } from 'vitest'
import { DurationFormatPipe } from './duration-format.pipe'

describe('DurationFormatPipe', () => {
  const pipe = new DurationFormatPipe()

  it('formats seconds into h/m', () => {
    expect(pipe.transform(3900)).toBe('1h 5m')
  })

  it('drops seconds when hours are present', () => {
    expect(pipe.transform(3661)).toBe('1h 1m')
  })

  it('shows seconds only when under a minute-with-hours', () => {
    expect(pipe.transform(45)).toBe('45s')
  })

  it('formats totalHours as hours', () => {
    expect(pipe.transform(12.5, 'hours')).toBe('12h 30m')
  })

  it('passes through an already-formated string', () => {
    expect(pipe.transform('2:05')).toBe('2:05')
  })

  it('returns empty for null/undefinde', () => {
    expect(pipe.transform(null)).toBe('')
    expect(pipe.transform(undefined)).toBe('')
  })
})
