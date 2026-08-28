import { describe, expect, it } from 'vitest'
import { toCourse, toCourseRequestDto } from './course.mapper'
import { courseMock, courseResponseDtoMock } from '../../../../testing/mocks/courses.mock'
import { CourseInput } from '../../domain/course.model'

describe('toCourse', () => {
  it('maps DTO to the Course entity', () => {
    expect(toCourse(courseResponseDtoMock)).toEqual(courseMock)
  })

  it('courses totalHours string to a number', () => {
    expect(toCourse({ ...courseResponseDtoMock, totalHours: '8' }).totalHours).toBe(8)
  })

  it('converts createdDate to a Date instance', () => {
    expect(toCourse(courseResponseDtoMock).createdDate).toBeInstanceOf(Date)
  })
})

describe('toCourseRequestDto', () => {
  const input: CourseInput = {
    name: 'New',
    description: 'Desc',
    totalHours: 4,
    thumbnailUrl: 'x',
  }

  it('uses courseId 0 and totalVideos 0 when there is no base (create)', () => {
    const dto = toCourseRequestDto(input)
    expect(dto.courseId).toBe(0)
    expect(dto.totalVideos).toBe(0)
    expect(dto.totalHours).toBe('4')
  })

  it('preserves id, totalVideos and createdDate from base(update)', () => {
    const dto = toCourseRequestDto(input, courseMock)
    expect(dto.courseId).toBe(courseMock.id)
    expect(dto.totalVideos).toBe(courseMock.totalVideos)
    expect(dto.createdDate).toBe(courseMock.createdDate.toISOString())
  })
})
