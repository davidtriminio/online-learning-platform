import { EnrollmentResponseDto } from '../../features/enrollments/infrastructure/dto/enrollment-response.dto'

export const enrollmentResponseDtoMock: EnrollmentResponseDto = {
  enrollmentId: 11,
  userId: 7,
  courseId: 3,
  enrolledDate: '2026-02-10T00:00:00.000Z',
  isCompleted: false,
  emailId: 'john@olp.dev',
  fullName: 'John Doe',
  courseName: 'Angular Fundamentals',
  courseDescription: 'Learn Angular from scratch',
  thumbnailUrl: 'https://cdn.olp.dev/angular.png',
}
