import { required, schema } from '@angular/forms/signals'

export interface VideoForm {
  url: string
  title: string
  description: string
  thumbnail: string
  duration: string
}

export const videoSchema = schema<VideoForm>((path) => {
  required(path.title, { message: 'Title is required.' })
  required(path.url, { message: 'Video URl is required.' })
})
