export interface EnrollmentResponseDto {
  enrollmentId: number
  userId: number
  courseId: number
  enrolledDate: string
  isCompleted: boolean
//   denormalize
  emailId: string
  fullName: string
  courseName: string
  courseDescription: string
  thumbnailUrl: string
}
