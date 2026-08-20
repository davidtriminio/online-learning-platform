import { CourseResponseDto } from '../dto/course-response.dto'
import { Course, CourseInput } from '../../domain/course.model'
import { CourseRequestDto } from '../dto/course-request.dto'

export function toCourse(dto: CourseResponseDto): Course {
  return {
    id: dto.courseId,
    name: dto.courseName,
    description: dto.courseDescription,
    totalHours: Number(dto.totalHours),
    totalVideos: dto.totalVideos,
    thumbnailUrl: dto.thumbnailUrl,
    createdDate: new Date(dto.createdDate),
  }
}

// verificar si existe el curso o sino, con la base (update) y con ausente (courseId:0, servidor)
export function toCourseRequestDto(input: CourseInput, base?: Course): CourseRequestDto {
  return {
    courseId: base?.id ?? 0,
    courseName: input.name,
    courseDescription: input.description,
    totalHours: String(input.totalHours),
    totalVideos: base?.totalVideos ?? 0,
    thumbnailUrl: input.thumbnailUrl,
    createdDate: (base?.createdDate ?? new Date()).toISOString(),
  }
}
