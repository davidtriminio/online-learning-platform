export interface AppError{
  status: number
  message: string
  code?: string
  details?: unknown
}
