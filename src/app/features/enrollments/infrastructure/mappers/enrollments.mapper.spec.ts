import { describe, expect, it } from 'vitest'
import { toCreateEnrollmentRequestDto, toEnrollment } from './enrollment.mapper'
import { enrollmentResponseDtoMock } from '../../../../testing/mocks/enrollments.mock'

describe('toEnrollment', () => {
  it('keeps only the thin entity fields', () => {
    expect(toEnrollment(enrollmentResponseDtoMock)).toEqual({
      id: 11,
      userId: 7,
      courseId: 3,
      enrolledDate: new Date('2026-02-10T00:00:00.000Z'),
      isCompleted: false,
    })
  })

  it('discards the denormalized course/user fields', () => {
    const e = toEnrollment(enrollmentResponseDtoMock)
    expect('courseName' in e).toBe(false)
    expect('fullName' in e).toBe(false)
  })
})

describe('toCreateEnrollmentRequestDto', () => {
  it('sends enrollmentId 0 and isCompleted false', () => {
    const dto = toCreateEnrollmentRequestDto({ userId: 7, courseId: 3 })
    expect(dto.enrollmentId).toBe(0)
    expect(dto.isCompleted).toBe(false)
    expect(dto.userId).toBe(7)
    expect(dto.courseId).toBe(3)
  })
})
