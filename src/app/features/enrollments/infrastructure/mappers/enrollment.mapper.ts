import { EnrollmentResponseDto } from '../dto/enrollment-response.dto'
import { Enrollment, EnrollmentInput } from '../../domain/enrollment.model'
import { CreateEnrollmentRequestDto } from '../dto/enrollment-request.dto'

export function toEnrollment(dto: EnrollmentResponseDto): Enrollment{
  return {
    id: dto.enrollmentId,
    userId: dto.userId,
    courseId: dto.courseId,
    enrolledDate: new Date(dto.enrolledDate),
    isCompleted: dto.isCompleted
  }
}

export function toCreateEnrollmentRequestDto(input: EnrollmentInput): CreateEnrollmentRequestDto{
  return {
    enrollmentId: 0,
    userId: input.userId,
    courseId: input.courseId,
    enrolledDate: new Date().toISOString(),
    isCompleted: false
  }
}
