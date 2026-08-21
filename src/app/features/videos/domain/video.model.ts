export interface Video {
  readonly id: number
  readonly url: string
  readonly title: string
  readonly description: string
  readonly thumbnail: string
  readonly duration: string
}

export interface VideoInput {
  readonly url: string
  readonly title: string
  readonly description: string
  readonly thumbnail: string
  readonly duration: string
}
