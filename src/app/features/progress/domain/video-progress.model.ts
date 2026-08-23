export interface VideoProgress {
  readonly id: number
  readonly enrollmentId: number
  readonly videoId: number
  readonly isStarted: boolean
  readonly isCompleted: boolean
  readonly startedDate: Date | null
  readonly completedDate: Date | null
}

export interface ProgressInput{
  readonly enrollmentId: number
  readonly videoId: number
}
