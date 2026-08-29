import { expect } from 'vitest'
import { toCourseVideo } from './course-video.mapper'
import { courseVideoResponseDtoMock } from '../../../../testing/mocks/course-video.mock'

describe('toCourseVideo', () => {
  it('maps the relation DTO field-for-field', () => {
    expect(toCourseVideo(courseVideoResponseDtoMock)).toEqual({
      courseVideoId: 50,
      courseId: 3,
      courseName: 'Angular Fundamentals',
      videoId: 100,
      videoTitle: 'Intro',
      videoUrl: 'https://youtu.be/abc',
    })
  })
})
