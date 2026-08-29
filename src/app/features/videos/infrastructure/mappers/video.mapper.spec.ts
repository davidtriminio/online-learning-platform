import { expect } from 'vitest'
import { toVideo, toVideoRequestDto } from './video.mapper'
import { videoResponseDtoMock, videoMock } from '../../../../testing/mocks/videos.mock'

describe('toVideo', () => {
  it('maps the DTO to the Video entity', () => {
    expect(toVideo(videoResponseDtoMock)).toEqual(videoMock)
  })
})

describe('toVideoRequestDto', () => {
  const input = { url: 'u', title: 't', description: 'd', thumbnail: 'th', duration: '120' }

  it('defaults videoId to 0 on create', () => {
    expect(toVideoRequestDto(input).videoId).toBe(0)
  })

  it('keeps the id on update and writes duration as totalDuration', () => {
    const dto = toVideoRequestDto(input, 100)
    expect(dto.videoId).toBe(100)
    expect(dto.totalDuration).toBe('120') // asimetría deliberada read/write
  })
})
