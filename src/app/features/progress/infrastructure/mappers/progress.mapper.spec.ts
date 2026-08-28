import { describe, expect, it } from 'vitest'
import { toCompleteRequestDto, toVideoProgress } from './progress.mapper'
import { progressResponseDtoMock } from '../../../../testing/mocks/progress.mock'

describe('toVideoProgress', () => {
  it('maps DTO to VideoProgress with Date instances', () => {
    const p = toVideoProgress(progressResponseDtoMock)
    expect(p.id).toBe(21)
    expect(p.startedDate).toBeInstanceOf(Date)
    expect(p.completedDate).toBeInstanceOf(Date)
  })

  it('maps empty date strings to null (not Invalid Date)', () => {
    const p = toVideoProgress({ ...progressResponseDtoMock, completedDate: '' })
    expect(p.completedDate).toBeNull()
  })
})

describe('toCompleteRequestDto', () => {
  it('reuses the existing progressId (no duplicate row)', () => {
    const base = toVideoProgress(progressResponseDtoMock)
    const dto = toCompleteRequestDto(base)
    expect(dto.progressId).toBe(21)
    expect(dto.isCompleted).toBe(true)
    expect(dto.isStarted).toBe(true)
  })
})
