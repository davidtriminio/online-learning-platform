import { CourseResponseDto } from '../../features/courses/infrastructure/dto/course-response.dto'
import { Course } from '../../features/courses/domain/course.model'

export const courseResponseDtoMock: CourseResponseDto = {
  courseId: 3,
  courseName: 'Angular Fundamentals',
  createdDate: '2026-01-10T08:00:00.000Z',
  totalHours: '12.5',
  totalVideos: 20,
  courseDescription: 'Learn Angular from scratch',
  thumbnailUrl: 'https://cdn.olp.dev/angular.png',
}

export const courseMock: Course = {
  id: 3,
  name: 'Angular Fundamentals',
  description: 'Learn Angular from scratch',
  totalHours: 12.5,
  totalVideos: 20,
  thumbnailUrl: 'https://cdn.olp.dev/angular.png',
  createdDate: new Date('2026-01-10T08:00:00.000Z'),
}

// lista con acento para el filtro acento-insensible

export const courseListDtoMock: CourseResponseDto[] = [
  courseResponseDtoMock,
  {
    courseId: 5,
    courseName: 'Programación en Python',
    createdDate: '2026-02-01T00:00:00.000Z',
    totalHours: '8',
    totalVideos: 10,
    courseDescription: 'Scripting y datos',
    thumbnailUrl: 'https://cdn.olp.dev/py.png',
  },
  {
    courseId: 8,
    courseName: 'React Avanzado',
    createdDate: '2026-03-01T00:00:00.000Z',
    totalHours: '6',
    totalVideos: 7,
    courseDescription: 'Hooks y patrones',
    thumbnailUrl: 'https://cdn.olp.dev/react.png',
  },
]
