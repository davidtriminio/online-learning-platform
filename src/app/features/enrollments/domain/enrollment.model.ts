export interface Enrollment {
  readonly id: number
  readonly userId: number
  readonly courseId: number
  readonly enrolledDate: Date
  readonly isCompleted: boolean
}

export interface EnrollmentInput{
  readonly userId: number
  readonly courseId: number
}
