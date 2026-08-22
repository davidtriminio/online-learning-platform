export interface CreateEnrollmentRequestDto{
  enrollmentId: number
  userId: number
  courseId: number
  enrolledDate: string
  isCompleted: boolean
}
