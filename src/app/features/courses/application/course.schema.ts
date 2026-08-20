import { min, required, schema } from '@angular/forms/signals'

export interface CourseForm {
  name: string
  description: string
  totalHours: number
  thumbnailUrl: string
}

export const courseSchema = schema<CourseForm>((path) => {
  required(path.name, { message: 'Course name is required.' })
  required(path.description, { message: 'Description is required.' })
  min(path.totalHours, 1, { message: 'Total hours must be at least 1.' })
  required(path.thumbnailUrl, { message: 'Thumbnail URL is required.' })
})
