export interface Course {
  readonly id: number,
  readonly name: string,
  readonly description: string,
  readonly totalHours: number,
  readonly totalVideos: number,
  readonly thumbnailUrl: string,
  readonly createdDate: Date,
}

export interface CourseInput {
  readonly name: string
  readonly description: string
  readonly totalHours: number
  readonly thumbnailUrl: string
}
