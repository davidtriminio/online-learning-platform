export interface ProgressRequestDto{
  progressId: number
  enrollmentId: number
  videoId: number
  isStarted: boolean
  isCompleted: boolean
  startedDate: string
  completedDate: string
}
